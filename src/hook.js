import {
  useSelector
} from "react-redux";

export function useGetBannerInfo() {
  const bannerId = useSelector((s) => s.creatorReducer.currentBanner)

  const bannerData = useSelector((state) =>
    state.creatorReducer.banners.find((b) => b.id === bannerId)
  );

  return {
    bannerId,
    bannerData
  };
}