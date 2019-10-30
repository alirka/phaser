// var http = require("http");
// var url = require("url");
// var fs = require("fs");
//
// const PORT = "8080";
//
// var serveur = http.createServer(traitReq);
// serveur.listen(PORT);
//
// function traitReq(requete, reponse) {
//     var monObj = url.parse(requete.url);
//     var contentType = "";
//
//     var fichier = "";
//     var encodage = "";
//     var dossier = "";
//     if (monObj.pathname === "/" || monObj.pathname === "/index.html"){
//         contentType = "text/html";
//         fichier = "index.html";
//         encodage = "UTF-8";
//         dossier = "html/"
//     } else if (monObj.pathname === "css/styles.css"){
//         contentType = "text/css";
//         fichier = "styles.css";
//         dossier = "css/"
//     } else if (monObj.pathname === "js_client/main.js"){
//         contentType = "application/javascript";
//         fichier = "main.js";
//         dossier = "js_client"
//     }
//
//     if (monObj.pathname !== "/favicon.ico"){
//         var pageHtml = fs.readFileSync(dossier + fichier, encodage);
//
//         reponse.writeHead(200, {"Content-type" : "text/html"});
//         reponse.write(pageHtml);
//         reponse.end();
//     }
// }
var http = require("http");
var url = require("url");
var fs = require("fs");

const PORT = "8080";

var serveur = http.createServer(traitReq);
serveur.listen(PORT);

function traitReq(requete, reponse){
    var monObj = url.parse(requete.url);
    var contentType = "";

    var fichier = "";
    var encodage = "";
    var dossier = "";
    if(monObj.pathname === "/" || monObj.pathname === "/index.html"){
        contentType = "text/html";
        fichier = "index.html";
        encodage = "UTF-8";
        dossier = "html/"
    } else if(monObj.pathname === "/main.css"){
        contentType = "text/css";
        fichier = "main.css";
        dossier = "css/"
    }else if(monObj.pathname === "/main.js"){
        contentType = "application/javascript";
        fichier = "main.js";
        dossier = "js_client/"
    }

    if(monObj.pathname !== "/favicon.ico"){
        var pageHtml = fs.readFileSync(dossier + fichier,encodage);

        reponse.writeHead(200,{"Content-Type" : contentType});
        reponse.write(pageHtml);
        reponse.end();
    }
}