<template>
    <div 
        class="editor-wrapper"
        v-loading="loadingFlag"
        :element-loading-text="loadingText">
        <!-- 海报列表 -->
        <image-list ref="image-size-list" :sizeList="sizeList" :posterDir="params.posterDir" @setPostList="setPostList" :index="params.index" :options="options" :systemType="params.systemType" v-on:loadImage="loadImage"></image-list>

        <!-- 云素材 -->
        <cloud-source v-if="isShowCloud" :params="params" v-on:togglePanel="togglePanel" v-on:loadImage="loadImage"></cloud-source>

        <div class="editor-content">
            <!-- 操作按键栏 -->
            <div class="editor-operate" v-bind:class="{original: isOriginal}">
                <div v-show="hasCloud" class="editor-operate-button" data-action="cloud" @click="operate('cloud')">云素材</div>
                <el-upload
                    class="editor-operate-upload"
                    action=""
                    :auto-upload="false"
                    :show-file-list="false"
                    accept="image/*"
                    :on-change="onFileChange"
                    :file-list="fileList">
                    <div class="editor-operate-button" data-action="file">本地上传</div>
                </el-upload>
                <div class="editor-operate-button" data-action="save" @click="operate('save')">保存</div>
                <div class="editor-operate-button" data-action="crop" @click="operate('crop')">裁切</div>
                <div class="editor-operate-button" data-action="rotate"  @click="operate('rotate')">旋转</div>
                <div class="editor-operate-button" data-action="base" @click="operate('base')">基础</div>
                <div class="editor-operate-button" data-action="color" @click="operate('color')">调色</div>
            </div>

            <!-- 图片显示区 -->
            <div class="editor-image">
                <div ref="image-editor"></div>
            </div>

            <!-- 图片裁剪/保存区 -->
            <size-panel ref="image-size-panel" :imgEdit="imgEdit" :isShowSave="isShowSave" :isShowCrop="isShowCrop" :sizeList="sizeList" v-on:upload="upload" v-on:togglePanel="togglePanel"></size-panel>

            <!-- 旋转 -->
            <rotate-panel ref="image-rotate-panel" :imgEdit="imgEdit" :isShowRotate="isShowRotate" v-on:togglePanel="togglePanel"></rotate-panel>

            <!-- 基础 -->
            <base-panel ref="image-base-panel" :imgEdit="imgEdit" :isShowBase="isShowBase" v-on:togglePanel="togglePanel"></base-panel>

            <!-- 调色 -->
            <color-panel ref="image-color-panel" :imgEdit="imgEdit" :isShowColor="isShowColor" v-on:togglePanel="togglePanel"></color-panel>

            <!-- 原图上传 -->
            <origin-panel ref="image-origin-panel" :isOriginal="isOriginal" :originalList="originalList" v-on:upload="upload" v-on:togglePanel="togglePanel"></origin-panel>
        </div>
    </div>
</template>
<script>
import PicTune from 'pic-tune';
import imageList from './components/imageList';
import sizePanel from './components/sizePanel';
import rotatePanel from './components/rotatePanel';
import basePanel from './components/basePanel';
import colorPanel from './components/colorPanel';
import originPanel from './components/originPanel';
import cloudSource from './components/cloudSource';
import {get_set_poster, get_iframe_list} from './apiConfig';
import { http } from '../utils';

const originSize = {
    list: ["recommend_1","recommend_2","recommend_3","recommend_4","recommend_5","recommend_6"],
    type: ["lookback","series","application","music","album","subject"]
}

export default {
    props: {
        options: {
            default: () => {
                return {};
            }
        },
        posterList: {
            default: () => {
                return {}
            }
        },
        uploadUrl: {
            default: ''
        }
    },
    data() {
        const params = Object.assign({
                systemType: '',
                subtype: '',
                posterDir: '',
                index: 1,
                postUrl: '',
                accesstoken: '',
                mediaId: '',
                channelId: '',
                videoId: '',
                version: '',
                starttime: '',
                endtime: '',
                definition: '',
                isAllowOrigin: false
            }, this.options);

        const systemType = params.systemType;


        const isAllowOrigin = params.isAllowOrigin;//originSize.type.indexOf(systemType) != -1;

        // if ( isAllowOrigin ) {
        //     sizeList["recommend"] = originSize.list;
        // }

        return {
            loadingText: '',
            loadingFlag: false,
            imgEdit: null,
            fileList: [],
            isShowSave: false,
            isShowCrop: false,
            isShowRotate: false,
            isShowBase: false,
            isShowColor: false,
            isShowCloud: false,
            params: params,
            setPosterUrl: this.uploadUrl || get_set_poster(params),
            sizeList: '',
            originalList: originSize.list,
            isOriginal: false,
            isAllowOrigin: isAllowOrigin,
            hasCloud: get_iframe_list(params) ? true : false
        }
    },
    methods: {
        loadImage ( url ) {
            this.imgEdit.loadAsUrl(url);
        },

        onFileChange (e) {
            const file = e.raw;

            this.operate('file');
            this.imgEdit.loadAsFile(file);

            if ( this.isAllowOrigin && file.type != 'image/jpeg' && file.type != 'image/jpg' ) {
                this.$confirm('当前上传的不是jpg格式，是否上传原图')
                    .then(_ => {
                        this.isOriginal = true;
                    })
                    .catch(_ => {
                        this.isOriginal = false;
                    });
            } else {
                this.isOriginal = false;
            }
        },

        operate ( action ) {
            if ( action != 'crop' && action != 'save' ) this.imgEdit.confirm();
            this.imgEdit.toggleCrop(action == 'crop');
            this.isShowSave = action == 'save';
            this.isShowCrop = action == 'crop';
            this.isShowBase = action == 'base';
            this.isShowColor = action == 'color';
            this.isShowRotate = action == 'rotate';
            this.isShowCloud = action == 'cloud';

            switch ( action ) {
                case 'save':
                case 'crop':
                    this.$refs['image-size-panel'].showCrop();
                    break;
                case 'base':
                case 'color':
                    this.$refs[`image-${action}-panel`].resetValue();
                    break;
            }
        },

        togglePanel ( action, toggle ) {
            let isShow = this[action];

            if ( typeof isShow != 'undefined' ) {
                this[action] = typeof toggle != 'undefined' ? toggle : !isShow;
            }
        },

        upload ( list, retArr ) {
            let url = this.setPosterUrl,
                data = list.pop(),
                size = data.name,
                width = data.width,
                height = data.height,
                options = {
                    width: width,
                    height: height,
                    isOrigin: !!data.isOrigin
                };

            retArr = retArr || [];

            retArr.push(size);

            this.loadingFlag = true;
            this.loadingText = `上传中(${retArr.length}/${retArr.length + list.length})`;

            if ( !size.match(/_\d+/) ) {
                size += `_${this.params.index}`;
            }

            url = url.replace(/{{size}}/g, size);
            url = url.replace(/{{width}}/g, width);
            url = url.replace(/{{height}}/g, height);

            options.url = url;

            const p = this.imgEdit.upload(options);

            return p
                .then((res) => {
                    if ( res.ret === 0 ) {
                        this.$refs['image-size-list'].updatePoster(size);

                        if ( list.length > 0 ) {
                            return this.upload(list, retArr);
                        } else {
                            return p.then(() => {
                                this.loadingFlag = false;

                                this.$message({
                                    message: '上传成功',
                                    type: 'success'
                                });

                                this.$emit('callback', retArr, this.params.index);
                            });
                        }
                    } else {
                        this.loadingFlag = false;

                        this.$message({
                            message: '上传失败',
                            type: 'error'
                        });
                    }
                }).catch((e) => {
                    console.log(e);

                    this.loadingFlag = false;

                    this.$message({
                        message: '服务器异常',
                        type: 'error'
                    });
                });
        },

        setPostList (data) {
            this.posterList = data
            if (!this.options.posterUrl) {
                var src = data[this.options.defaultSize] ? 
                        data[this.options.defaultSize].src : 
                        data[Object.keys(data)[0]].src
                this.loadImage(src)
            }
        },  

        // tc-add:
        getPosterList () {
            this.loadingFlag = true
            let type = getType(this.systemType)
            http.get({
                url: 'http://dtv.homed.me/config/postersize/get_list',
                data: {
                    accesstoken: this.options.accesstoken,
                    type: type
                },
                type: 'json'
            }).then((res) => {
                let data = res
                let i = 0
                if (type === 21 && systemType== 'subject') { // 专题节目处理
                    i = 1
                }
                let size_info = data.size_list[0].size_arr[i].size_info
                let arr = size_info.map(item => {
                    return item.size
                })
                let obj1 = checkPoster(arr)
                let obj1_key = Object.keys(obj1).sort()
                obj1_key.reduce((a, c, index) => {
                    if (Math.abs(a - c).toFixed(2) == 0.01) {
                        obj1[a] = obj1[a].concat(obj1[c])
                        delete obj1[c]
                    }
                    return c
                }, 0)
                for (const key in obj1) {
                    if (obj1.hasOwnProperty(key)) {
                        const element = obj1[key];
                        obj1[element[0]] = element
                        delete obj1[key]
                    }
                }
                console.log('obj1: ', obj1);
                this.sizeList = Object.assign({}, this.posterList || (obj1));
                if ( this.isAllowOrigin ) {
                    this.sizeList["recommend"] = originSize.list;
                }
            }).finally(() => {
                this.loadingFlag = false
            })
            // var xhr = new XMLHttpRequest()
            // var url = `http://dtv.homed.me/config/postersize/get_list?accesstoken=${this.options.accesstoken}&type=${type}`
            // xhr.onreadystatechange = () => {
            //     if (xhr.readyState === 4) {
            //         if (xhr.status >= 200 &&
            //             xhr.status < 300 ||
            //             xhr.status == 304) {
            //             let i = 0
            //             let data = JSON.parse(xhr.responseText)
            //             if (type === 21 && systemType== 'subject') { // 专题节目处理
            //                 i = 1
            //             }
            //             let size_info = data.size_list[0].size_arr[i].size_info
            //             let arr = size_info.map(item => {
            //                 return item.size
            //             })
            //             let obj1 = checkPoster(arr)
            //             let obj1_key = Object.keys(obj1).sort()
            //             obj1_key.reduce((a, c, index) => {
            //                 if (Math.abs(a - c).toFixed(2) == 0.01) {
            //                     obj1[a] = obj1[a].concat(obj1[c])
            //                     delete obj1[c]
            //                 }
            //                 return c
            //             }, 0)
            //             for (const key in obj1) {
            //                 if (obj1.hasOwnProperty(key)) {
            //                     const element = obj1[key];
            //                     obj1[element[0]] = element
            //                     delete obj1[key]
            //                 }
            //             }
            //             console.log('obj1: ', obj1);                        
            //         }
            //     }
            // }
            // xhr.open('get', url)
            // xhr.send()
        },
        radioOfPoster(size) {
            let width = size.split('x')[0]
            let height = size.split('x')[1]
            let radio = (width / height).toFixed(2)
            return radio
        },
        checkPoster(arr) {
            return arr.reduce((o, k, index) => {
                radioOfPoster(k) in o ? o[radioOfPoster(k)].push(k) : o[radioOfPoster(k)] = [k]
                return o;
            }, {})
        },
        getType(name){
            switch (name) {
                case 'monitor': // 监控
                    return 9
                case 'application': // 应用
                    return 3  
                case 'subjectBackground': // 专题
                case 'subject':
                    return 21
                case 'playlist': // 播单
                    return 23
                case 'news': // 资讯
                    return 8
                case 'lookback': // 回看
                    return 4
                case 'video': // 视频上传
                    return 2
                case 'ticket': // 旅游
                    return 18
                default:
                    return 2
            }
        }
    },
    mounted() {
        const options = {
            element: this.$refs['image-editor'],
            // width: '200px',
            height: '545px',
            url: this.options.posterUrl,
            output: 'image/jpg',
            onMovingCrop: () => {
                this.$refs['image-size-panel'].curCropPosition = this.imgEdit.getCropPosition();
            },
        };
        this.loadingFlag = true;

        this.imgEdit = new PicTune(options);

        this.loadingFlag = false;
    },
    components: {
        imageList,
        sizePanel,
        rotatePanel,
        basePanel,
        colorPanel,
        originPanel,
        cloudSource
    }
}
</script>
<style scoped>
.editor-wrapper {
    position: relative;
}

.editor-content {
    position: relative;
    margin-left: 225px;
    background-color: #f0f0f0;
}

.editor-operate-upload {
    display: inline-block;
}

.editor-operate {
    background-color: #f7f7f7;
    border-bottom: 1px solid #dcdcdc;
}

.editor-operate.original > * {
    display: none;
}

.editor-operate.original .editor-operate-upload {
    display: block;
}

.editor-operate-button {
    display: inline-block;
    position: relative;
    width: 70px;
    text-align: center;
    margin: 4px 2px;
    padding: 24px 0 5px 0;
    border-right: 1px solid #dcdcdc;
    background-color: #f7f7f7;
    background-repeat: no-repeat;
    background-position: center 0;
    color: #646464;
    font-size: 14px;
}

.editor-operate-button[data-action="file"] {
    background-image: url(images/file.png);
}

.editor-operate-button[data-action="save"] {
    background-image: url(images/save.png);
}

.editor-operate-button[data-action="crop"] {
    background-image: url(images/crop.png);
    border: none;
}

.editor-operate-button[data-action="rotate"] {
    background-image: url(images/rotate.png);
}

.editor-operate-button[data-action="base"] {
    background-image: url(images/base.png);
}

.editor-operate-button[data-action="color"] {
    background-image: url(images/color.png);
}

.editor-operate-button[data-action="cloud"] {
    background-image: url(images/cloud.png);
}

.editor-operate-button:hover {
    background-color: #ddd;
}

.editor-image {
    width: 78%;
}

.editor-wrapper >>> .editor-card {
    position: absolute;
    top: 10px;
    right: 2px;
    width: 20%;
    height: calc(100% - 12px);
    overflow: hidden;
}

.editor-wrapper >>> .editor-card-title {
    color: #0170a2;
    font-weight: bold;
    margin: -10px 0 30px;
}

.editor-wrapper >>> .editor-card-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: url(images/icon_close.png) no-repeat 0 0 #d23c0a;

}

.editor-wrapper >>> .editor-card-close:hover {
    background-color: #e23c0a;
}

.editor-wrapper >>> .editor-card-btns {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 10px;
    text-align: center;
}

.editor-wrapper >>> .editor-card-item {
    position: relative;
    margin-top: 5px;
}

.editor-wrapper >>> .editor-card-item p {
    float: left;
    font-size: 10px;
    line-height: 5px;
}

.editor-wrapper >>> .editor-card-item p.right {
    float: right;
}

.editor-wrapper >>> .el-slider__button {
    background-color: #fff;
    border: 1px solid #aaa;
}

.editor-wrapper >>> .editor-card .editor-card-checkbox {
    margin-top: 20px;
}

.editor-wrapper >>> .editor-card .editor-card-checkbox {
    display: block;
    margin: 10px 0;
}
</style>