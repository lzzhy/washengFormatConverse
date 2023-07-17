// import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";

export const handlePreviewImages = (dom: HTMLImageElement) => {
  // View an image.
  const viewer = new Viewer(dom, {});
  viewer.show();
};
