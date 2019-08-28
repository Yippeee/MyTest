var RVH = document.querySelector('#route-view-hash')

window.addEventListener('hashchange', function () {
    console.log(0)
})

window.onhashchange = function () {
    console.log(2222)
}