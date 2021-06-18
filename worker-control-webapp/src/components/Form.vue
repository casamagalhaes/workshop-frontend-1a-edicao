<script>
export default {
  name: 'Form',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {
        nome: '',
        usuario: '',
        setor: '',
        cargo: '',
        saldo_horas: 0,
        admin: false,
        endereco_logradouro: '',
        endereco_numero: '',
        endereco_bairro: '',
        endereco_cep: '',
        email: '',
        telefone: '',
      },
      fields: {
        firstTab: [
          {
            prop: 'nome',
            label: 'Nome',
            required: true,
            validate: (value) => !!value,
          },
          {
            prop: 'usuario',
            label: 'Usuário',
            required: true,
            validate: (value) => !!value,
          },
          { prop: 'setor', label: 'Setor' },
          { prop: 'cargo', label: 'Cargo' },
          {
            prop: 'saldo_horas',
            label: 'Saldo de horas',
            required: true,
            validate: (value) => !isNaN(Number(value)),
          },
          {
            prop: 'admin',
            label: 'Administrador',
            type: 'switch',
            required: true,
            validate: (value) => typeof value === 'boolean',
          },
        ],
        secondTab: [
          { prop: 'endereco_logradouro', label: 'Logradouro' },
          { prop: 'endereco_numero', label: 'Número' },
          { prop: 'endereco_bairro', label: 'Bairro' },
          { prop: 'endereco_cep', label: 'CEP' },
          { prop: 'email', label: 'Email' },
          { prop: 'telefone', label: 'Telefone' },
        ],
      },
      tabs: [
        { fieldsProp: 'firstTab', label: 'Informações iniciais' },
        { fieldsProp: 'secondTab', label: 'Informações complementares' },
      ],
    }
  },
  computed: {
    isValidForm() {
      let isValid = true
      const { firstTab, secondTab } = this.fields

      const requiredFields = [
        ...Object.values(firstTab),
        ...Object.values(secondTab),
      ].filter((field) => field.required)

      for (let i = 0; i < requiredFields.length; i++) {
        const value = this.formData[requiredFields[i].prop]
        if (requiredFields[i].validate(value)) continue

        isValid = false
        break
      }

      return isValid
    },
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(val) {
        if (Object.keys(val).lenght) this.formData = { ...val }
      },
    },
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Home' })
    },
  },
}
</script>

<template>
  <section class="form">
    <form class="form__content">
      <ShrTab class="form__tabs">
        <ShrTabPanel
          v-for="(tab, index) in tabs"
          :name="tab.label"
          :selected="index === 0"
          :key="`${tab.label}-${index}`"
        >
          <div class="form__inputs">
            <div
              v-for="(field, index) in fields[tab.fieldsProp]"
              :key="`${field.prop}-${index}`"
              class="form__input"
            >
              <template v-if="field.type === 'switch'">
                <label for="admin" class="form__label">Administrador</label>
                <ShrSwitch
                  v-model="formData[field.prop]"
                  id="admin"
                  side-text
                  :texts="{ active: 'Sim', inactive: 'Não' }"
                />
              </template>
              <template v-else>
                <ShrInput
                  v-model="formData[field.prop]"
                  :label="field.label"
                  :required="field.required"
                  size="xg"
                />
              </template>
            </div>
          </div>
        </ShrTabPanel>
      </ShrTab>
    </form>
    <footer class="form__footer">
      <ShrButton type="secondary" @click="cancel">Cancelar</ShrButton>
      <ShrButton type="success" :disabled="!isValidForm">Salvar</ShrButton>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  &__content {
    height: 100%;
    width: 100%;
  }

  &__inputs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    padding-top: 2rem;
  }

  &__input {
    display: flex;
    flex-direction: column;
    justify-items: center;
  }

  &__label {
    color: var(--shr-color-grayscale-focus);
    margin-bottom: 5px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 1rem;
  }
}
</style>
