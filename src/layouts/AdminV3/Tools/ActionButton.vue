<template>
  <div class="flex items-center justify-start">
    <!-- <ElButton v-if="userStore.teamInfo?.invitationStatus" type="primary" @click="handleInviteMember"> {{ $t("yaoqingtua_74e447") }}</ElButton>
    <ElButton type="primary" @click="hadnleJoinMeeting"> {{ $t("jiarubaiba_b41e4d") }}</ElButton> -->
  </div>
</template>

<script setup lang="ts">
import { $t } from "@/i18n";
import JoinCard from "@/components/Business/JoinCard.vue";
const userStore = useUserStore();

function hadnleJoinMeeting() {
  Dialog.open(JoinCard, { hiddenFooter: true, title: $t("jiarubaiba_b41e4d"), width: 600 });
}

function handleInviteMember() {}
</script>
