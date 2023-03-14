import axios from 'axios'

const tokenName = 'a4c87b4146104266b12f4e3397c539cf'

export const authenticated = axios.create({
  // baseURL: 'https://api.football-data.org/v4',
  headers: {
    'X-AUTH-TOKEN': tokenName,
  },
})