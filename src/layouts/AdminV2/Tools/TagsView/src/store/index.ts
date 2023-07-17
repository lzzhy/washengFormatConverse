import { RouteLocationNormalized, RouteRecordNormalized, RouteLocationNormalizedLoaded } from "vue-router";
import router from "@/vendors/route";
import { store } from "@/vendors/store";

export interface TagsView {
  visitedViews: RouteLocationNormalizedLoaded[];
  cachedViews: Set<string>;
}

export const useTagsStore = defineStore({
  id: "tagsView",
  state: (): TagsView => {
    return {
      visitedViews: [],
      cachedViews: new Set(),
    };
  },
  getters: {
    getVisitedViews(state): RouteLocationNormalizedLoaded[] {
      return state.visitedViews;
    },
    getCachedViews(state): string[] {
      return Array.from(state.cachedViews);
    },
  },
  actions: {
    ADD_VIEW(data: RouteLocationNormalizedLoaded) {
      const { visitedViews } = this;
      visitedViews.push(data);
    },
    ADD_CACHED(data: Set<string>) {
      this.cachedViews = data;
    },
    SET_VIEW(data: RouteLocationNormalizedLoaded[]) {
      this.visitedViews = data;
    },
    addView(view: RouteLocationNormalizedLoaded) {
      // context.dispatch("addVisitedView", view);
      this.addVisitedView(view);
      this.addCachedView();
      // context.dispatch("addCachedView");
    },
    addVisitedView(view: RouteLocationNormalizedLoaded) {
      // 已存在数组中的路由不在添加进入
      if (this.visitedViews.some((v) => v.path === view.path)) return;
      if (view.meta?.noTagsView) return;
      this.ADD_VIEW({ ...view, title: view.meta?.title || "no-name" } as any);
    },
    //选中缓存
    addCachedView() {
      const cacheMap: Set<string> = new Set();
      for (const v of this.visitedViews) {
        const item = getRawRoute(v);
        const needCache = !item.meta?.noCache;
        if (!needCache) continue;
        const name = item.name as string;
        cacheMap.add(name);
      }
      if (Array.from(this.cachedViews).sort().toString() === Array.from(cacheMap).sort().toString()) return;
      this.ADD_CACHED(cacheMap);
    },
    // 删除元素
    delView(view: RouteLocationNormalizedLoaded) {
      this.delVisitedView(view);
      this.delCachedView();
    },
    // 删除tag
    delVisitedView(view: RouteLocationNormalizedLoaded) {
      const vList = [...this.visitedViews];
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          vList.splice(i, 1);
          //   commit("SET_VIEW", vList);
          this.SET_VIEW(vList);
          break;
        }
      }
    },
    // 删除缓存
    delCachedView() {
      const cached = this.cachedViews;
      const route = router.currentRoute.value;
      const index = this.getCachedViews.findIndex((v: string) => v === route.name);
      if (index > -1) {
        cached.delete(this.getCachedViews[index]);
      }
      this.ADD_CACHED(cached);
    },
    // 删除左侧标签页
    delLeftViews(view: RouteLocationNormalizedLoaded) {
      const visitedViews = this.visitedViews;
      const index = visitedViews.findIndex((v) => v.path === view.path);
      if (index > -1) {
        // commit("SET_VIEW", );
        // dispatch("addCachedView");
        this.SET_VIEW(visitedViews.slice(index));
        this.addCachedView();
      }
    },
    // 删除右侧标签页
    delRightViews(view: RouteLocationNormalizedLoaded) {
      const visitedViews = this.visitedViews;
      const index = visitedViews.findIndex((v) => v.path === view.path);
      if (index > -1) {
        // commit("SET_VIEW", visitedViews.slice(0, index + 1));
        this.SET_VIEW(visitedViews.slice(0, index + 1));
        // dispatch("addCachedView");
        this.addCachedView();
      }
    },
    // 关闭其他
    delOthersViews(view: RouteLocationNormalizedLoaded) {
      const vItem = this.visitedViews.filter((v) => v.path === view.path);
      //   commit("SET_VIEW", vItem);
      this.SET_VIEW(vItem);
      //   dispatch("addCachedView");
      this.addCachedView();
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithout() {
  return useTagsStore(store);
}

export const getRawRoute = (route: RouteLocationNormalized): RouteLocationNormalized => {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
};
