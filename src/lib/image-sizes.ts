type CoverImageSizeOptions = {
  width: number;
  height: number;
  mobileHeight: number;
  desktopHeight: number;
  mobileSlot?: string;
  desktopSlot?: string;
  breakpoint?: number;
};

// object-fit: cover can crop a much wider image into a narrow frame. Advertise
// that uncropped width so the browser does not stretch a thumbnail to fill it.
export function coverImageSizes({
  width, height, mobileHeight, desktopHeight,
  mobileSlot = "calc(100vw - 3rem)", desktopSlot = "44vw",
  breakpoint = 760,
}: CoverImageSizeOptions) {
  const aspectRatio = width / height;
  const mobileWidth = Math.ceil(mobileHeight * aspectRatio);
  const desktopWidth = Math.ceil(desktopHeight * aspectRatio);
  return `(max-width: ${breakpoint}px) max(${mobileSlot}, ${mobileWidth}px), max(${desktopSlot}, ${desktopWidth}px)`;
}
