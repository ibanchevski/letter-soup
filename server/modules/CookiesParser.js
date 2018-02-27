module.exports.parseCookies = function(cookies) {
    
    if (!cookies) {
        return null;
    }

    const cookiesArr = cookies.split('; ');
    const parsedCookies = cookiesArr.map(function(cookie) {
        const cookieName = cookie.substring(0, cookie.indexOf('='));
        const cookieValue = cookie.substring(cookie.indexOf('=') + 1);
        return { name: cookieName, value: cookieValue };
    });
    return parsedCookies;
};