Snippet: Meta Tags para Google Bot

Este snippet sencillo permite insertar rápidamente las meta tags para Google Bot en archivos HTML.
En el vídeo puede verse dinámicamente cómo se utiliza a la hora de crear el archivo. 

Ejemplo para la tarea de Lenguaje de Marcas

{
    "Meta Tags for Google Bot": {
        "prefix": "metabot",
        "body": [
            "<meta name=\"googlebot\" content=\"${1|index,follow,noindex,nofollow|}\" />",
            "<meta name=\"robots\" content=\"${2|all,noindex,nofollow|}\" />",
            "<meta name=\"description\" content=\"$3\" />",
            "<meta name=\"author\" content=\"${4:YourName}\" />",
            "<meta charset=\"${5|UTF-8,ISO-8859-1|}\">"
        ],
        "description": "Snippet for Google Bot meta tags"
    }
}