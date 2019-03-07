var myLodash = {
    chunk: function (arr, size = 1) {
        var result = []
        for (var i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size))
        }
        return result
    },
    compact: function(arr){
        return Array.isArray(arr) ? arr.filter(function (element) {
            return !!element
        }) : []
    }
}
// console.log('myLodash.chunk(): ', myLodash.chunk(['a', 'b', 'c', 'd'], 3));
console.log('compact([0, 1, false, 2,  3]): ', myLodash.compact(false));