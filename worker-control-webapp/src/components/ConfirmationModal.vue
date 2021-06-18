<script>
export default {
  props: {
    mainText: {
      type: String,
      default: () => 'Tem certeza que deseja confirmar essa exclusão?',
    },
    subtitle: {
      type: String,
      default: () => 'Esta ação é irreversível.',
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <ShrModal
    headerless
    :value="showModal"
    class="confirmation-modal"
    @close="$emit('cancel')"
  >
    <article class="confirmation-modal__content">
      <ShrIcon size="90" name="trash" class="confirmation-modal__icon" />
      <span class="confirmation-modal__title">
        {{ mainText }}
      </span>
      <span class="confirmation-modal__subtitle">
        {{ subtitle }}
      </span>
    </article>
    <footer class="confirmation-modal__footer">
      <ShrButton type="secondary" @click="$emit('cancel')">Cancelar</ShrButton>
      <ShrButton
        type="secondary"
        secondary-type="danger"
        @click="$emit('confirm')"
      >
        Confirmar
      </ShrButton>
    </footer>
  </ShrModal>
</template>

<style lang="scss" scoped>
.confirmation-modal {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  &__icon {
    padding-bottom: 15px;
    color: var(--shr-color-brand-primary);
  }

  &__title {
    color: var(--shr-color-grayscale-focus);
  }

  &__subtitle {
    font-size: 12px;
    color: var(--shr-color-grayscale-disabled);
  }

  &__footer {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
}
</style>
