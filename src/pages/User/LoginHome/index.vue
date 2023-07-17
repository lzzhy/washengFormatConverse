<template>
  <Transition name="fade-slide" mode="out-in" appear>
    <div class="login-container">
      <div class="login-header">
        <img class="login-header__logo" src="@/assets/img/login/logo.png" alt="..." />
        <div class="mr-[120px] flex items-center">
          <LangChange v-if="!route.path.includes('register') && !route.path.includes('forget-password')"></LangChange>
          <!-- <div class="login-header__btn">{{ $t("tongguojia_a18cba") }}</div> -->
        </div>
      </div>
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { LANGUAGE_NAME } from "@/enums/common";

const appStore = useAppStore();

const route = useRoute();
</script>

<style src="./index.scss" lang="scss"></style>
