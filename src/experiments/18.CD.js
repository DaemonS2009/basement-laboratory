import { model } from '~/lib/builders/model'

const CD = model('cd.glb', {
  scale: 0.6,
  ambientLight: 0.1,
  background: '#000',
  environment: 'sunset'
})

CD.Title = 'LordMercy'
CD.Tags = 'Low-Poly Memories'

export default CD
