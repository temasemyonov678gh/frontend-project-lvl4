export default {
  translation: {
    header: {
      brand: "Hexlet Chat",
      button: "Выйти",
    },
    chatPage: {
      channels: "Каналы",
      dropdown: {
        hidden: "Управление каналом",
        rename: "Переименовать",
        remove: "Удалить",
      },
      message_zero: "{{count}} сообщений",
      message_one: "{{count}} сообщение",
      message_few: "{{count}} сообщения",
      message_many: "{{count}} сообщений",
    },
    loginPage: {
      welcomeMessage: "Добро пожаловать !",
      heading: {
        loginToAccount: "Войдите в аккаунт",
        useChat: "Чтобы пользоваться чатом",
      },
      noAccount: "Нет аккаунта ?",
      signup: "Зарегистрироваться",
    },
    signUpPage: {
      welcomeMessage: "Добро пожаловать !",
      heading: {
        signup: "Зарегистрируйтесь",
        useChat: "Чтобы пользоваться чатом",
      },
      haveAccount: "Уже есть аккаунт ?",
      login: "Войти",
    },
    modals: {
      add: {
        title: "Добавить канал",
      },
      rename: {
        title: "Переименовать канал",
      },
      remove: {
        title: "Удалить канал",
      },
    },
    formsElements: {
      name: {
        label: "Название канала",
      },
      username: {
        label: "Имя пользователя",
        placeholder: "Введите ваше имя",
      },
      password: {
        label: "Пароль",
        placeholder: "Введите ваш пароль",
      },
      confirmPassword: {
        label: "Подтвердите пароль",
        placeholder: "Введите ваш пароль",
      },
      message: {
        label: "Введите сообщение",
        placeholder: "Введите сообщение",
      },
      confirm: "Уверены?",
      buttons: {
        login: "Войти",
        signup: "Зарегистрироваться",
        add: "Добавить",
        rename: "Переименовать",
        remove: "Удалить",
      },
    },
    errors: {
      name: "От 3 до 20 символов",
      username: "От 3 до 20 символов",
      password: "Не менее 6 символов",
      confirmPassword: "Пароли должны совпадать",
      required: "Обязательное поле",
      auth: "Неверные имя пользователя или пароль",
      exist: "Такой пользователь уже существует",
      network: "Ошибка соединения",
      unique: 'Должно быть уникальным',
    },
  },
};
