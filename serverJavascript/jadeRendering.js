/**
 * Created by root on 3/16/16.
 */


module.exports = {
    renderJade: function (title, contentType, content, loggedIn, renderedSidebar) {
        return {
            "title": title,
            "contentType": contentType,
            "content": content,
            "loggedIn": loggedIn,
            "renderedSidebar": renderedSidebar
        }
    }
}