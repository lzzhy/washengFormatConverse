import { useTagsStore } from "../../store";
import { useRouter, RouteLocationNormalizedLoaded } from "vue-router";

export function useTag() {
  const { currentRoute, push, replace, getRoutes } = useRouter();
  const store = useTagsStore();
  // 存储当前路由
  const selectedTag = ref<RouteLocationNormalizedLoaded>();
  // 路由变化的时候将当前路由加入到vuex中
  function addTags() {
    const { name } = unref(currentRoute);
    if (name) {
      selectedTag.value = unref(currentRoute);
      // store.dispatch("tagsView/addView", unref(currentRoute));
      store.addView(unref(currentRoute));
    }
  }
  // 判断是否是当前tag
  function isActive(route: RouteLocationNormalizedLoaded): boolean {
    return route.path === unref(currentRoute).path;
  }
  // 关闭选中的tag
  function closeSelectedTag(view: RouteLocationNormalizedLoaded) {
    if (view?.meta?.affix) return; // 如果是固定的页面不能关闭
    // store.dispatch("tagsView/delView", view);
    store.delView(view);
    if (isActive(view)) {
      toLastView();
    }
  }

  // 关闭左侧标签页
  function closeLeftTags() {
    // store.dispatch("tagsView/delLeftViews", unref(selectedTag) as RouteLocationNormalizedLoaded);
    store.delLeftViews(unref(selectedTag) as RouteLocationNormalizedLoaded);
  }

  // 关闭右侧标签页
  function closeReftTags() {
    // store.dispatch("tagsView/delRightViews", unref(selectedTag) as RouteLocationNormalizedLoaded);
    store.delRightViews(unref(selectedTag) as RouteLocationNormalizedLoaded);
  }

  // 关闭其他
  function closeOthersTags() {
    // store.dispatch("tagsView/delOthersViews", unref(selectedTag) as RouteLocationNormalizedLoaded);
    store.delOthersViews(unref(selectedTag) as RouteLocationNormalizedLoaded);
  }

  // 重新加载当前tag页面
  function refreshTag() {
    refreshSelectedTag(unref(selectedTag) as RouteLocationNormalizedLoaded);
  }

  async function refreshSelectedTag(view: RouteLocationNormalizedLoaded) {
    if (!view) return;
    // store.dispatch("tagsView/delCachedView");
    store.delCachedView();
    const { fullPath } = view;
    await nextTick();
    replace({
      path: "/redirect" + fullPath,
    });
  }

  // 跳转到最后一个
  function toLastView() {
    const allRouteList = getRoutes();
    const visitedViews = store.visitedViews;
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
      push(latestView);
    } else {
      if (unref(currentRoute).path === allRouteList[0].path || unref(currentRoute).path === allRouteList[0].redirect) {
        addTags();
        return;
      }
      push(allRouteList[0].path);
    }
  }

  onMounted(() => {
    addTags();
    // iconSchema.value = setSchema();
  });

  watch(
    () => currentRoute.value,
    () => {
      addTags();
    }
  );
  return {
    toLastView,
    selectedTag: selectedTag,
    closeSelectedTag,
    closeLeftTags,
    closeReftTags,
    refreshTag,
    refreshSelectedTag,
    addTags,
    closeOthersTags,
  };
}
