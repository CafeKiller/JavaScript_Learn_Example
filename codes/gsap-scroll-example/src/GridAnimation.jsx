import { useLayoutEffect, useState } from "react"
import { chooseAnimation, initSmoothScrolling, useImagePreloader, supportsCssVars } from "./utils"
import gridAnimationConfig from "./const"
import './style/index.less'


function GridAnimation() {
    const [loading, setLoading] = useState(true)
    const images = useImagePreloader()

    useLayoutEffect(() => {
        supportsCssVars() || alert('您的浏览器无法支持 CSS 变量, 请下载最新版的 Chrome 或其他更现代的浏览器')
        initSmoothScrolling()
        const grids = document.querySelectorAll('.grid')
        Array.from(grids).map((grid, i) => chooseAnimation(`grid--${i + 1}`, grid))
        setLoading(false)
    }, [images])
    if (loading || !images.length) return <div className="loading"></div>
    
	return (
		<div>
			<main>
				<div className="intro">
					<h1 className="intro__title">
						<span className="intro__title-pre">Cafe-Scroll</span>
						<span className="intro__title-sub">Perspective Grid Animations</span>
					</h1>
					<span className="intro__info">Scroll moderately to fully experience the animations</span>
				</div>

				{
					gridAnimationConfig.map(({ sectionClassName, h3ClassName, children }, index) => (
						<section key={index} className={'content ' + sectionClassName}>
							<div className={'grid'}>
								<div className="grid-wrap">
									{
										images.map((item, index) => (
											<div className="grid__item" key={index}>
												<img className="grid__item-inner" src={item.src} />
											</div>
										))
									}
								</div>
							</div>
							<h3 className={'content__title ' + h3ClassName}>{children}</h3>
						</section>
					))
				}
			</main>
		</div>
	)
}
export default GridAnimation