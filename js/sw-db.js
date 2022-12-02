const db = new PouchDB('noticias');
var remoteCouch = false;

db.changes({
    since: 'now',
    live: true,
}).on('change', noticias);

function saveArticle(article) {
    db.post(article);
}

function noticias(){
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        listaHtml(doc.rows);
    });
}
noticias()
function listaHtml(articles){
    $('#main').html('');
    articles.forEach(function(article){
        let htmlArt = createArticle(article.doc)
        $('#main').append(htmlArt)
    })
}