type PixPayloadParams = {
  key: string;
  name: string;
  city: string;
  txid: string;
  description?: string;
  amount?: string;
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
}

function formatField(id: string, value: string) {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}

function crc16(payload: string) {
  let crc = 0xffff;

  for (let index = 0; index < payload.length; index += 1) {
    crc ^= payload.charCodeAt(index) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function buildPixPayload({
  key,
  name,
  city,
  txid,
  description,
  amount,
}: PixPayloadParams) {
  const merchantAccount = formatField(
    "26",
    [
      formatField("00", "br.gov.bcb.pix"),
      formatField("01", key),
      description ? formatField("02", normalizeText(description)) : "",
    ].join(""),
  );

  const payload = [
    formatField("00", "01"),
    merchantAccount,
    formatField("52", "0000"),
    formatField("53", "986"),
    amount ? formatField("54", amount) : "",
    formatField("58", "BR"),
    formatField("59", normalizeText(name).slice(0, 25)),
    formatField("60", normalizeText(city).slice(0, 15)),
    formatField(
      "62",
      formatField("05", normalizeText(txid).slice(0, 25)),
    ),
  ]
    .filter(Boolean)
    .join("");

  const body = `${payload}6304`;
  return `${body}${crc16(body)}`;
}
