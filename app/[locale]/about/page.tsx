export const metadata = {
  title: '关于我们 - Reiboreal',
  description: '了解Reiboreal品牌故事和价值观',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 品牌名称 */}
        <h1 className="text-6xl md:text-7xl font-serif text-center mb-16">
          Reiboreal
        </h1>

        {/* 品牌故事 */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif mb-6">我们的故事</h2>
          <div className="space-y-4 text-lg text-charcoal/80 leading-relaxed">
            <p>
              Reiboreal 诞生于 2023 年，品牌名称融合了「Real」（真实）的理念。
              我们相信，真正的美来自于对工艺的执着和对细节的追求。
            </p>
            <p>
              创始人在游历世界各地后，被不同文化中的手工艺术所打动，
              决心创建一个能够将传统工艺与现代设计完美结合的品牌。
            </p>
            <p>
              每一件 Reiboreal 的作品都经过精心设计和手工制作，
              我们不追求大规模生产，而是专注于为每位顾客打造独一无二的饰品。
            </p>
          </div>
        </section>

        {/* 品牌价值观 */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif mb-6">品牌价值观</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full mx-auto mb-4
                            flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-serif mb-2">品质至上</h3>
              <p className="text-charcoal/70">
                精选材料，匠心工艺，每个细节都追求完美
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full mx-auto mb-4
                            flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-serif mb-2">独特设计</h3>
              <p className="text-charcoal/70">
                原创设计，拒绝平庸，让你与众不同
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full mx-auto mb-4
                            flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-serif mb-2">可持续</h3>
              <p className="text-charcoal/70">
                环保材料，负责任生产，关爱地球
              </p>
            </div>
          </div>
        </section>

        {/* 工艺介绍 */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif mb-6">手工工艺</h2>
          <div className="bg-white rounded-sm p-8">
            <p className="text-lg text-charcoal/80 leading-relaxed mb-6">
              我们的每一件作品都经过多道精细工序：
            </p>
            <ol className="space-y-4 text-charcoal/80">
              <li className="flex gap-4">
                <span className="font-serif text-gold text-xl">01</span>
                <div>
                  <strong>设计草图</strong> - 将灵感转化为图纸
                </div>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-gold text-xl">02</span>
                <div>
                  <strong>材料甄选</strong> - 精挑细选每一块原料
                </div>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-gold text-xl">03</span>
                <div>
                  <strong>手工塑形</strong> - 匠人亲手打造每个细节
                </div>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-gold text-xl">04</span>
                <div>
                  <strong>精细打磨</strong> - 反复打磨至完美状态
                </div>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-gold text-xl">05</span>
                <div>
                  <strong>品质检验</strong> - 严格质检确保完美呈现
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* 联系方式 */}
        <section className="text-center bg-sand rounded-sm p-12">
          <h2 className="text-3xl font-serif mb-4">联系我们</h2>
          <p className="text-charcoal/70 mb-6">
            有任何问题或定制需求，随时与我们联系
          </p>
          <div className="space-y-2 text-charcoal/80">
            <p>邮箱：hello@reiboreal.com</p>
            <p>Instagram：@reiboreal</p>
            <p>微信：reiboreal_official</p>
          </div>
        </section>
      </div>
    </div>
  )
}
