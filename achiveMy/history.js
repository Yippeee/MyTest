var RV = null
window.addEventListener('popstate', routeChange)
window.addEventListener('DOMContentLoaded', onload);

function onload() {
    RV = document.querySelector('#route-view')
    routeChange()

    let aList = document.querySelectorAll('a')
    aList.forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault()
            history.pushState(null, '', e.target.getAttribute('href'))
            routeChange()
        })
    })
}
function routeChange() {
    console.log('pathname: ', location.pathname);
    switch (location.pathname) {
        case '/a':
            console.log('aaaaa')
            RV.innerHTML = 'aaa'
            return
        case '/b':
            RV.innerHTML = 'bbb'
            return
        default:
            return
    }
}