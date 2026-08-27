/** Central registry of brand photography. */
export const IMAGES = {
  hero: "https://image.qwenlm.ai/generated-images/aa5e79b4-ef89-4251-b95d-656729a0fb66/_result.png",
  flame: "https://image.qwenlm.ai/generated-images/f30aca81-077b-4312-98f4-cb938307b416/_result.png",
  atelier: "https://image.qwenlm.ai/generated-images/09a434dd-37d8-4fe0-95b4-3e3a0daa44e8/_result.png",
  ceremony: "https://image.qwenlm.ai/generated-images/a1806c4a-c55f-4f3d-a14d-71b522e5a425/_result.png",
  crossMacro: "https://image.qwenlm.ai/generated-images/8857d49d-d749-4fb5-880d-b846ec1b01ef/_result.png",
  towel: "https://image.qwenlm.ai/generated-images/d53abdb3-f747-4b84-b07b-eb41b19b96e1/_result.png",
  flowers: "https://image.qwenlm.ai/generated-images/12a2d634-3896-4a04-a2bf-c5f87670e58f/_result.png",
  church: "https://image.qwenlm.ai/generated-images/73c1615d-f58a-4fea-8278-812c8ae2ac82/_result.png",
  box: "https://image.qwenlm.ai/generated-images/06f1d88b-e4f7-4a89-b090-bbb449b25286/_result.png",
  dove: "https://image.qwenlm.ai/generated-images/0588ef64-bc8d-4045-9789-1319a1010f62/_result.png",
} as const;

export type ImageKey = keyof typeof IMAGES;
