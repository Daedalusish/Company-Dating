module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
  },
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    pear: {
      DEFAULT: '#B7DEBD'
    },
    melon: {
      DEFAULT: '#FCDFD8'
    },
    sand: {
      DEFAULT: '#E4E1DB'
    },
    forest: {
      DEFAULT: '#4B6455'
    },
    dBlack: {
      DEFAULT: '#333333'
    },
    mint: {
      DEFAULT: '#DBEEDE'
    },
    clay: {
      DEFAULT: '#A5B1AA'
    },
    pebble: {
      DEFAULT: '#F1F0ED'
    },
    lollipop: {
      DEFAULT: '#FF00FF'
    }
  }
}
  
  ,
  variants: {},
  plugins: [],
  purge: {
    content: ['./public/**/*.html', './src/**/*.vue'],
    options: {
      whitelistPatterns: [ 
    /-(leave|enter|appear)(|-(to|from|active))$/, 
    /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/
      ],
    },
 }
}