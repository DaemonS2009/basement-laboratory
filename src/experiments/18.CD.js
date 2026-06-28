import { model } from '~/lib/builders/model'

const CD = model('cd.glb', {
  scale: 0.6,
  ambientLight: 0.1,
  background: '#000',
  environment: 'sunset'
})

CD.Title = 'LordMercy Low-Poly Memories'
CD.Tags = '8 track LP'

export default CD
