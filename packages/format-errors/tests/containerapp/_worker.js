export default {
    async fetch (req, env) {
        const index = await env.ASSETS.fetch(req);
        if ((new URL(req.url)).pathname !== "/") {
            //console.log("asset", req.url)
            return index;
        }

        let errror = new Error();

        errror.stack = `Error
    at thro (nodeapp/bottom.ts:4:11)
    at thr (nodeapp/middle.ts:4:5)
    at Object.<anonymous> (nodeapp/top.ts:3:1)`


        const indexText = await index.text()
        const error = { name: errror.name, message: errror.message, stack: errror.stack  }
        const payload = { error: error, headers: { "Content-Type": "text/javascript" } }
        const resp = await fetch(`http://localhost:8766`, {
            method: "POST",
            body: JSON.stringify(payload),
        })
        const formatErrorText = (await resp.text());
        //console.log(indexText);
        const fixedText = formatErrorText.replaceAll(/&/g, '&amp;').replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;').replaceAll(/"/g, "&quot;");
        const responseText = indexText.replace('IFRAMEXX', () => `<iframe srcdoc="${fixedText}" data-testid="worker" width="100%" height = "1000"></iframe>`);
        // console.log(responseText)
        return new Response(responseText, {headers: { "Content-Type": "text/html; charset=utf-8" }});
    }
}