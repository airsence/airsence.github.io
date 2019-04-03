postJSON(INFO_URL,function(err,json){
    let articles = json.articles;
    let twitter = json.twitter;
    let videos= json.videos;


    let articleBlock = new Vue({
        el:"#article",
        component:{
            "NewBlock":NewBlock
        },
        data:articles
    });

    let videoBlock = new Vue({
        el:"#video",
        component:{
            "VideoBlock":VideoBlock
        },
        data:videos
    });
    
    let twitterBlock = new Vue({
        el:"#twitter",
        data: twitter
    })
})
