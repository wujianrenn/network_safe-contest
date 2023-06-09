<template>
    <div class="middle">
        <h2 class="c">
            Welcome administrator !
        </h2>
    </div>
</template>

<script>
export default {
    setup() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.middle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
}

.c{
    position: absolute;
    top: 30%;
    left: 55%;
    transform: translate(-50%, -50%);
}
</style>