<template>
  <div class="suspense-component">
    <Suspense>
      <template #default>
        <slot></slot>
      </template>
      <template #fallback>
        <Loading></Loading>
      </template>
    </Suspense>
  </div>
</template>
