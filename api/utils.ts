import crypto from "crypto";

/**
 * Note Header Encryption Algorism
 * Every Fetch Request Need to pass this
 */

function md5Hash(inputStr: string): string {
  return crypto.createHash("md5").update(inputStr, "utf8").digest("hex");
}

function getSecret(appKey: string): string {
  const hashKey = md5Hash("key" + appKey);
  return hashKey.slice(0, 15).slice(-10);
}

function sign(
  appKey: string,
  timestamp: number,
  requestBody: string
): string | null {
  try {
    const secret = getSecret(appKey);
    const sbSign = appKey + secret + timestamp.toString() + requestBody;
    return md5Hash(sbSign).toUpperCase();
  } catch (err) {
    console.error(`生成签名异常: ${err}`);
    return null;
  }
}

export function sendHeaderGenerate(
  data: Record<string, unknown>
): Record<string, string> {
  const SERVER_APP_KEY = "2";
  const timestamp = Date.now();
  const bodyStr = JSON.stringify(data);
  const s = sign(SERVER_APP_KEY, timestamp, bodyStr);
  return {
    "Content-Type": "application/json",
    appkey: SERVER_APP_KEY,
    timestamp: timestamp.toString(),
    sign: s ?? "",
  };
}
