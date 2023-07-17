<template>
  <div class="dropdown">
    <div tabindex="0" class="btn-ghost btn gap-1 normal-case">
      <svg class="inline-block h-4 w-4 fill-current md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
        <path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"></path>
        <path
          d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"
        ></path>
      </svg>
      <svg width="12px" height="12px" class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
    </div>
    <div class="dropdown-content rounded-t-box rounded-b-box top-px mt-16 w-56 overflow-y-auto bg-base-200 text-base-content shadow-2xl">
      <ul class="menu menu-compact gap-1 p-3" tabindex="0">
        <li>
          <button class="flex" :class="{ active: appStore.locale === 'en' }" @click="appStore.changeLocale(LANGUAGE_NAME.en[0] as any)">
            <img loading="lazy" width="20" height="20" alt="English" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg" /> <span class="flex flex-1 justify-between">{{ LANGUAGE_NAME.en[1] }}</span>
          </button>
        </li>
        <!-- <li>
          <button class="flex"><img loading="lazy" width="20" height="20" alt="Español" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ea-1f1f8.svg" /> <span class="flex flex-1 justify-between">Español </span></button>
        </li>
        <li>
          <button class="flex"><img loading="lazy" width="20" height="20" alt="Français" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1eb-1f1f7.svg" /> <span class="flex flex-1 justify-between">Français </span></button>
        </li>
        <li>
          <button class="flex"><img loading="lazy" width="20" height="20" alt="Indonesia" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ee-1f1e9.svg" /> <span class="flex flex-1 justify-between">Indonesia </span></button>
        </li>
        <li>
          <button class="flex"><img loading="lazy" width="20" height="20" alt="日本語" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ef-1f1f5.svg" /> <span class="flex flex-1 justify-between">日本語 </span></button>
        </li>
        <li>
          <button class="flex"><img loading="lazy" width="20" height="20" alt="한국어" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f0-1f1f7.svg" /> <span class="flex flex-1 justify-between">한국어 </span></button>
        </li>
        <li>
          <button class="flex"><img loading="lazy" width="20" height="20" alt="Português" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f5-1f1f9.svg" /> <span class="flex flex-1 justify-between">Português </span></button>
        </li>
        <li>
          <button class="flex"><img loading="lazy" width="20" height="20" alt="Русский" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f7-1f1fa.svg" /> <span class="flex flex-1 justify-between">Русский </span></button>
        </li> -->
        <li>
          <button class="flex" :class="{ active: appStore.locale === 'zh-cn' }" @click="appStore.changeLocale(LANGUAGE_NAME['zh-cn'][0] as any)">
            <img loading="lazy" width="20" height="20" :alt="$t('zhongwen_a7bac2')" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1e8-1f1f3.svg" /> <span class="flex flex-1 justify-between">{{ LANGUAGE_NAME["zh-cn"][1] }} </span>
          </button>
        </li>
        <li>
          <button class="flex" :class="{ active: appStore.locale === 'ja' }" @click="appStore.changeLocale(LANGUAGE_NAME.ja[0] as any)">
            <img loading="lazy" width="20" height="20" alt="Japanese" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ef-1f1f5.svg" /> <span class="flex flex-1 justify-between">{{ LANGUAGE_NAME.ja[1] }} </span>
          </button>
        </li>
        <!-- <li>
          <button class="flex"><img loading="lazy" width="20" height="20" alt="繁體中文" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f9-1f1fc.svg" /> <span class="flex flex-1 justify-between">繁體中文 </span></button>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LANGUAGE_NAME } from "@/enums/common";

const appStore = useAppStore();
</script>
<style scoped>
.dropdown-end .dropdown-content {
  right: 0;
}
</style>
