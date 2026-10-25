const FANVUE_URL = "https://www.fanvue.com/karinasweett/fv-9";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/go/fanvue") {
      const cf = request.cf || {};
      const click = {
        event: "fanvue_click",
        city: cf.city || "unknown",
        region: cf.region || "unknown",
        country: cf.country || "unknown",
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get("user-agent") || "unknown"
      };
      console.log(JSON.stringify(click));
      return Response.redirect(FANVUE_URL, 302);
    }

    return env.ASSETS.fetch(request);
  }
};
