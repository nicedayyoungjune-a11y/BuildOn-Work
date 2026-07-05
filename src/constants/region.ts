export const REGIONS = [
  "gyeonggi_suwon",
  "gyeonggi_yongin",
  "gyeonggi_hwaseong",
  "gyeonggi_pyeongtaek",
  "chungcheong_daejeon",
  "chungcheong_sejong",
  "chungcheong_cheonan",
  "chungcheong_cheongju"
] as const;

export type Region = (typeof REGIONS)[number];

export const REGION_LABELS: Record<Region, string> = {
  gyeonggi_suwon: "경기 수원",
  gyeonggi_yongin: "경기 용인",
  gyeonggi_hwaseong: "경기 화성",
  gyeonggi_pyeongtaek: "경기 평택",
  chungcheong_daejeon: "대전",
  chungcheong_sejong: "세종",
  chungcheong_cheonan: "충남 천안",
  chungcheong_cheongju: "충북 청주"
};
