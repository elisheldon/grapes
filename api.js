const snoothApiKey = ''

export const searchSnooth = async query => {
  const response = await fetch(`http://api.snooth.com/wines/?akey=${snoothApiKey}&q=${query}`)
  const {wines} = await response.json()
  let winesClean = ['no results']
  if(wines){
    winesClean = wines.map(wineRaw => {
      let wine = {}
      if(wineRaw.name != '') wine.name = wineRaw.name
      if(wineRaw.vintage != '') wine.vintage = wineRaw.vintage
      if(wineRaw.type != '') wine.type = wineRaw.type
      if(wineRaw.varietal != '') wine.varietal = wineRaw.varietal.replace(/\^/g, "; ")
      if(wineRaw.winery != '') wine.winery = wineRaw.winery
      if(wineRaw.region != '') wine.region = wineRaw.region
      if(wineRaw.code != '') wine.code = wineRaw.code
      if(wineRaw.image != '') wine.image = wineRaw.image
      return wine
    })
  }
  return winesClean
}