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
      signup: "Регистрация",
    },
    signUpPage: {
      welcomeMessage: "Регистрация",
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
      nickname: {
        label: "Ваш ник",
        placeholder: "Ваш ник",
      },
      username: {
        label: "Имя пользователя",
        placeholder: "Имя пользователя",
      },
      password: {
        label: "Пароль",
        placeholder: "Пароль",
      },
      confirmPassword: {
        label: "Подтвердите пароль",
        placeholder: "Введите пароль",
      },
      message: {
        label: "Введите сообщение",
        placeholder: "Введите сообщение",
      },
      confirm: "Уверены?",
      buttons: {
        login: "Войти",
        signup: "Зарегистрироваться",
        add: "Отправить",
        rename: "Отправить",
        remove: "Отправить",
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
      unique: "Должно быть уникальным",
    },
    success: {
      create: "Канал создан",
      rename: "Канал переименован",
      remove: "Канал удалён",
    },
  },
};
