import {
  CREATE_BANNER,
  UPDATE_BANNER,
  BANNER_ID,
  DELETE_BANNER
} from "../actions/actionsType.js";

const initialState = {
  currentBanner: "",
  blankData: {
    id: "",
    label: "бланк для баннера",
    textColor: {
      alpha: 1,
      "​​blue": 13,
      "​​green": 13,
      "​​hue": 0,
      "​​red": 114,
      "​​saturation": 88,
      "​​style": "rgba,114, 13, 13, 1)",
      "​​value": 45,
    },
    description: "Пустой бланк для баннера. Нужен для создания нового баннера и добавления в список",
    bgcolor: {
      style: "linear-gradient(0deg, rgba(29, 219, 229, 1) 0%, rgba(255, 255, 255, 1) 100%)"
    },
    imageUri: "",
    uppercase: true,
    url: "https://www.ya.ru",
  },
  banners: [{
      id: "",
      label: "бланк для баннера",
      textColor: {
        alpha: 1,
        blue: 10,
        green: 10,
        hue: 0,
        red: 12,
        saturation: 16,
        style: "rgba(12, 10, 10, 1)",
        value: 5,
      },
      description: "Пустой бланк для баннера. Нужен для создания нового баннера и добавления в список",
      bgcolor: {
        style: "linear-gradient(0deg, rgba(29, 219, 229, 1) 0%, rgba(255, 255, 255, 1) 100%)"
      },
      imageUri: "",
      uppercase: true,
      url: "https://www.ya.ru",
    },
    {
      id: "00a$",
      label: "surviv Battle Royale",
      textColor: {
        alpha: 1,
        blue: 10,
        green: 10,
        hue: 0,
        red: 12,
        saturation: 16,
        style: "rgba(12, 10, 10, 1)",
        value: 5,
      },
      description: "Surviv.io - это бесплатная браузерная многопользовательская онлайн-игра на базе браузера, разработанная Джастином Кимом и Ником Кларком. Она вышла в октябре 2017 года на своем сайте surviv.io",
      bgcolor: {
        style: "linear-gradient(45deg, rgba(0, 100, 0, 1), rgba(144, 238, 144, 1))"
      },
      imageUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Surviv.io.png/512px-Surviv.io.png",
      uppercase: false,
      url: "https://www.surviv.io",
    },
    {
      id: "00a&",
      label: "World of warcraft",
      textColor: {
        alpha: 1,
        blue: 10,
        green: 10,
        hue: 0,
        red: 12,
        saturation: 16,
        style: "rgba(12, 10, 10, 1)",
        value: 5,
      },
      description: "Вышло дополнение Shadowlands, и его первый сезон начался. Сражайтесь с опасными противниками, получайте новые награды и достижения, а также участвуйте в рейдах в замке Нафрия — оплоте сира Денатрия, расположенном во мрачном сердце Ревендрета.",
      bgcolor: {
        style: "radial-gradient(at bottom, rgba(255, 124, 124, 1) 40%, rgba(128, 0, 128, 1) 100%)"
      },
      imageUri: "https://assets.worldofwarcraft.com/static/components/Logo/Logo-wow-sitenav.596840db77b4d485a44d65e897e3de57.png",
      uppercase: false,
      url: "https://worldofwarcraft.com/ru-ru/",
    }
  ]
};

export const creatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BANNER: {
      let newBanner = {
        ...action.data
      }

      return {
        ...state,
        banners: [...state.banners.map(b => !b.id ? state.blankData : b), newBanner],
      }
    }
    case UPDATE_BANNER: {
      let id = action.data.id;

      return {
        ...state,
        banners: state.banners.map(b => {
          if (b.id === id) {
            return {
              ...b,
              ...action.data
            };
          }

          return b;
        }),
      }
    }
    case DELETE_BANNER: {
      const id = action.id;

      return {
        ...state,
        banners: state.banners.filter(b => b.id === id ? false : true),
      }
    }
    case BANNER_ID: {
      let id = action.id;

      return {
        ...state,
        currentBanner: id,
      }
    }
    default: {
      return state;
    }
  }
};