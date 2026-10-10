(function () {
    function loadHTML(url, target) {
        return fetch(url)
            .then(function (res) { return res.text(); })
            .then(function (html) {
                target.innerHTML = html;
                target.replaceWith.apply(target, target.childNodes);
            });
    }

    var header = document.getElementById('site-header');
    var footer = document.getElementById('site-footer');

    var tasks = [];
    if (header) tasks.push(loadHTML('header.html', header));
    if (footer) tasks.push(loadHTML('footer.html', footer));

    Promise.all(tasks).then(function () {
        var path = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === path || href === path.replace('.html', '') ||
                (path === 'index.html' && (href === '#services' || href === '#contact'))) {
                link.classList.add('active');
            }
        });
    });
})();
