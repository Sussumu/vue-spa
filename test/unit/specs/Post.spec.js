import Vue from 'vue'
import Post from '../../../src/theme/Post.vue'

describe('Post.vue', () => {
  const createComponent = () => {
    const PostConstructor = Vue.extend(Post)
    const comp = new PostConstructor({
      propsData: {
        link: 'https://www.pluralsight.com'
      }
    }).$mount()
    return comp
  }

  it('should render the link', () => {
    const comp = new createComponent()
    expect(comp.$el.querySelector('.card-footer-item').getAttribute('href'))
      .to.equal('https://www.pluralsight.com')
  })

  it('should update element\'s href when property link changes', (done) => {
    const comp = new createComponent()
    expect(comp.$el.querySelector('.card-footer-item').getAttribute('href'))
      .to.equal('https://www.pluralsight.com')

    comp.link = "https://fullstackweekly.com"
    Vue.nextTick(() => {
      expect(comp.$el.querySelector('.card-footer-item').getAttribute('href'))
        .to.equal('https://fullstackweekly.com')
      done()
    })
  })
})
