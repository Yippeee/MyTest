class Dialog {
    constructor(options) {
        this.options = options
        this.init()
    }
    init() {
        let { title, content, buttons } = this.options
        this.$dialog = $(`
            <div class="yippee-dialog">
                <div class="yippee-wrapper">
                    <header>${title}</header>
                    <main>${content}</main>
                    <footer></footer>
                </div>
            </div>`)
        this.$dialog.find('footer').append(
            buttons.map(buttonsOpn => {
                var $bt = $('<button></button>')
                $bt.text(buttonsOpn.text)
                $bt.on('click',buttonsOpn.action)
                return $bt
            })
        )
    }
    open() {
        this.$dialog.appendTo('body')
    }
    close() {
        this.$dialog.detach()
    }
}
bt.onclick = function () {
    console.log(3333)
    dialog.open()
}

var dialog = new Dialog({
    title: 'title',
    content: '<b>It is content</b>',
    buttons: [{
        text: 'confirm',
        action: function () {
            // dialog.close()
            dialog2.open()
        }
    }, {
        text: 'cancel',
        action: function () {
            dialog.close()
        }
    }]
})
bt2.onclick = function () {
    dialog2.open()
}

var dialog2 = new Dialog({
    title: 'title222',
    content: '<b>It is content222</b>',
    buttons: [{
        text: 'confirm',
        action: function () {
            dialog2.close()
        }
    }, {
        text: 'cancel',
        action: function () {
            dialog2.close()
        }
    }]
})