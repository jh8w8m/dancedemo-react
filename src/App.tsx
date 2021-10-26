import React, { useState, useEffect, useRef} from 'react';
import { Scene, Group, PerspectiveCamera, AmbientLight, DirectionalLight, TextureLoader, SphereGeometry, MeshBasicMaterial, Mesh, WebGLRenderer, Camera, BoxGeometry, PointLight, Renderer, KeyframeTrack, AnimationClip, AnimationMixer, LoopOnce, Clock, AxesHelper} from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import "./App.scss";
import Stats from 'three/examples/jsm/libs/stats.module';
import Video from './Video';
import Counter from './Counter';
import rhythm from './rhythm.json';
import TWEEN from '@tweenjs/tween.js';

let downTimer = 10; // default: 2s

// function App() {
//     const mount = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         if (mount.current) {
//             let width = mount.current.clientWidth;
//             let height = mount.current.clientHeight;
//             let renderer: WebGLRenderer, spotLight: DirectionalLight, orbitControls:OrbitControls;
//             let stats = Stats();
//             let container = document.getElementById('WebGL-output');
            
        
//             // 创建场景 场景最重要，可以理解为当前页面展示3D的沙盒
//             let scene = new Scene();
//             let group = new Group();
//             scene.add( group );

//             // 创建相机，相当于目前在沙箱中，我们的视角位置，模拟人眼所看到的景象
//             // 透视投影摄像机
//             /*
//             fov — 摄像机视锥体垂直视野角度
//             aspect — 摄像机视锥体长宽比
//             near — 摄像机视锥体近端面
//             far — 摄像机视锥体远端面
//             */
//             let camera = new PerspectiveCamera( 60, width / height, 1, 2000 );
//             camera.position.x = -10;
//             camera.position.y = 15;
//             camera.position.z = 500;
//             camera.lookAt( scene.position );

//             // 控制镜头的运动
//             orbitControls = new OrbitControls(camera);
//             orbitControls.autoRotate = false;

//             // 环境光
//             let ambi = new AmbientLight(0x686868); //环境光
//             scene.add(ambi);
            
//             // 光照效果
//             spotLight = new DirectionalLight(0xffffff);
//         	spotLight.position.set(550, 100, 550);
//         	spotLight.intensity = 0.6;
//         	scene.add(spotLight);

//             // 创建一个纹理加载器对象，可以加载图片作为几何体纹理
//             let loader = new TextureLoader();
//             let planetTexture = require("./Earth.png");

//             loader.load( planetTexture, function ( texture ) {
//                 let geometry = new SphereGeometry( 200, 20, 20 );
//                 let material = new MeshBasicMaterial( { map: texture,} );
//                 // 创建
//                 let mesh = new Mesh( geometry, material );
//                 group.add( mesh );
//             } );
            
//             // 创建一个渲染器
//             renderer = new WebGLRenderer();
//             renderer.setClearColor( 0xffffff );
//             renderer.setPixelRatio( window.devicePixelRatio );
//             renderer.setSize( width, height );

//             // 可以理解为将渲染的东西加入到HTML标签中
//             if (container) {
//                 container.appendChild( renderer.domElement );
//                 container.appendChild( stats.dom );  //增加状态信息 
//             }

        

//             // 定义自动的动画
//             const Animate = () => {
//                 requestAnimationFrame(() => Animate());
//                 group.rotation.y -= 0.005;  //这行可以控制地球自转
//                 render();
//                 stats.update();
//             }
//             const render = () => {
//                 renderer.render( scene, camera );
                
//             }
//             Animate(); // 执行动画，并自动递归调用自己
// 		}
//     }, []) // 监听空数组，相当于constructor

//   return (
//     <div className="App">
//         <div id='WebGL-output' ref={mount}></div>
//     </div>
//   );
// }
// const App = () => {
//     const { useRef, useEffect, useState } = React
//     const mount = useRef<HTMLDivElement>(null)
//     const [isAnimating, setAnimating] = useState(true)
//     const controls = useRef<controlRef | null>(null);
    
//     useEffect(() => {
//         if (!mount.current) {
//             throw Error("null ref");
//         }
//         else {
//             let width = mount.current.clientWidth
//             let height = mount.current.clientHeight
//             let frameId: number | null;
    
//             const scene = new Scene()
//             const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
//             const renderer = new WebGLRenderer({ antialias: true, alpha:true })

//             // 创建一个网格对象
//             const geometry = new BoxGeometry(1, 1, 1)
//             const material = new MeshBasicMaterial({ color: 0xff00ff })
//             const cube = new Mesh(geometry, material)
            
//             camera.position.z = 4
//             scene.add(cube)
//             // 设置背景为透明色
//             renderer.setClearColor('0xEEEEEE', 0.0)
//             renderer.setSize(width, height)
    
//             const renderScene = () => {
//                 renderer.render(scene, camera)
//             }
        
//             const handleResize = () => {
//                 if (!mount.current) {
//                     throw Error("null mount ref");
//                 }
//                 width = mount.current.clientWidth
//                 height = mount.current.clientHeight
//                 renderer.setSize(width, height)
//                 camera.aspect = width / height
//                 camera.updateProjectionMatrix()
//                 renderScene()
//             }
            
//             // const animate = () => {
//             //     cube.rotation.x += 0.01
//             //     cube.rotation.y += 0.01
        
//             //     renderScene()
//             //     frameId = window.requestAnimationFrame(animate)
//             // }
        
//             // const start = () => {
//             //     if (!frameId) {
//             //     frameId = requestAnimationFrame(animate)
//             //     }
//             // }
        
//             // const stop = () => {
//             //     cancelAnimationFrame(frameId as number)
//             //     frameId = null
//             // }
        
//             mount.current.appendChild(renderer.domElement)
//             window.addEventListener('resize', handleResize)
//             renderer.render(scene, camera);
//             //start()
        
//             //controls.current = { start, stop }
            
//             return () => {
//                 let i = mount.current as HTMLDivElement;
//                 //stop()
//                 window.removeEventListener('resize', handleResize)
//                 i.removeChild(renderer.domElement)
        
//                 scene.remove(cube)
//                 geometry.dispose()
//                 material.dispose()
//             }
//         }
//     }, [])
    
//     // useEffect(() => {
//     //     if (isAnimating && controls.current) {
//     //         (controls.current).start()
//     //     } else if (!isAnimating && controls.current){
//     //         controls.current.stop()
//     //     }
//     // }, [isAnimating])
    
//     return(
//         <>
//             <div className="vis" ref={mount} onClick={() => setAnimating(!isAnimating)} />
//             <Video src={require('./test4.mp4').default}  autoPlay={false} loop={true}/>
//         </>
//     ) 
// }



// const App = () => {
//     const mount = useRef<HTMLDivElement>(null)
//     const controls = useRef<sceneRef | null>(null);
//     const [ score, setScore ] = useState(0);
    
    

//     useEffect(() => {
//         if (!mount.current) {
//             throw Error("null ref");
//         }
//         else {
//             var axes = new AxesHelper(20);
//             let width = mount.current.clientWidth
//             let height = mount.current.clientHeight
//             let stats = Stats();
//             const scene = new Scene()
            

//             const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
//             // const orbitControls = new OrbitControls(camera);
//             // orbitControls.autoRotate = false;
//             const renderer = new WebGLRenderer({ antialias: true, alpha:true })

            
//             // 创建一个网格对象
//             const geometry = new BoxGeometry(0.8, 0.1, 12) // 盒体的长宽高
//             // 判定区域 z轴 8.8 ~ 10
//             const material = new MeshBasicMaterial({ color: 0xff00ff })
//             //const cube = new Mesh(geometry, material)
            

//             const rail1 = new Mesh(geometry, material);
//             const rail2 = new Mesh(geometry, material);
//             const rail3 = new Mesh(geometry, material);
//             rail1.translateX(1);
//             rail3.translateX(-1);
//             rail1.rotateX(0.05); // 内部为弧度，弧度计算 (角度/180)*PAI = 弧度
//             rail2.rotateX(0.05);
//             rail3.rotateX(0.05);
//             rail1.translateZ(5);
//             rail2.translateZ(5);
//             rail3.translateZ(5);


//             //scene.add(cube)
//             scene.add(rail1);
//             scene.add(rail2);
//             scene.add(rail3);
//             // 设置背景为透明色
//             renderer.setClearColor('0xEEEEEE', 0.0)
//             renderer.setSize(width, height)
            
//             // const point = new PointLight(0xFFFFFF);
//             // point.position.set(0, 2, 0);
//             // scene.add(point);
//             scene.add(axes);
            
//             camera.position.x = 0;
//             camera.position.y = 1;
//             camera.position.z = 12.5;
//             // camera.position.x = 3;
//             // camera.position.y = -0.5;
//             // camera.position.z = 11;
//             // camera.rotateY(20);

//             // 创建 downBlock 的 group
//             let group = new Group();

//             controls.current = { scene, renderer, camera, group, stats}; // 获取scene的引用

//             const render = () => {
//                 renderer.render(scene, camera);
//                 stats.update();
//             }
            
//             // window.size 改变，重新渲染图形
//             const handleResize = () => {
//                 if (!mount.current) {
//                     throw Error("null mount ref");
//                 }
//                 width = mount.current.clientWidth
//                 height = mount.current.clientHeight
//                 renderer.setSize(width, height)
//                 camera.aspect = width / height
//                 camera.updateProjectionMatrix()
//                 render()
//             }
                    
//             mount.current.appendChild(renderer.domElement);
//             mount.current.appendChild( stats.dom );
//             window.addEventListener('resize', handleResize);
//             //orbitControls.addEventListener('change', render);
//             render();
//             // stats.begin();

//             const handleSpaceDown = (e:KeyboardEvent) => {
//                 if(e.key == 'Space') {

//                 }
//             }

//             const setKeybordDown = () => {
//                 window.addEventListener('keypress', handleSpaceDown);
//             }
//             setKeybordDown();



//             return () => { // 清除副作用
//                 let realMount = mount.current as HTMLDivElement;
//                 window.removeEventListener('resize', handleResize);
//                 window.removeEventListener('keydown', handleSpaceDown);
//                 //orbitControls.removeEventListener('change', render);

//                 realMount.removeChild(renderer.domElement);
        
//                 scene.remove(rail1);
//                 scene.remove(rail2);
//                 scene.remove(rail3);
//                 geometry.dispose();
//                 material.dispose();

//                 // stats.end();
//             }
//         }

        

//     }, [])
    
//     // const render = () => {
//     //     let {
//     //         scene,
//     //         renderer,
//     //         camera,
//     //         stats,
//     //     } = controls.current as sceneRef;

//     //     renderer.render(scene, camera);
//     //     stats.update();

//     //     let T = clock.getDelta();
//     //     tick += T;
//     //     timeS = timeS + T;
//     //     console.log(tick);
        
//     //     if (timeS >= renderInterval) {
//     //         renderer.render(scene, camera); //执行渲染操作
//     //         mixer.update(T);
//     //         //console.log("here");
//     //         //TWEEN.update(T);
//     //         timeS = 0;
//     //         stats.update();
//     //     }
        
//     //     requestAnimationFrame(render);     

//     // }

//     const handleGenerate = (direction: string) => {
//         let {
//             scene,
//             renderer,
//             camera,
//             group,
//             stats,
//         } = controls.current as sceneRef;

//         const FPS = 60;
//         const renderInterval = 1 / FPS; 

//         let blockStartPosition = 0;
//         let downTimer = 30;

//         switch(direction) {
//             case 'l': blockStartPosition = -1; break;
//             case 'm': blockStartPosition = 0; break;
//             case 'r': blockStartPosition = 1; break;
//             default: throw new Error("wrong direction");
//         }

//         const geometry = new BoxGeometry(0.8, 0.03, 0.7) // 盒体的长宽高
//         const material = new MeshBasicMaterial({ color: 0xDC143C })
//         const block = new Mesh(geometry, material);
//         // block.name = "downBox";
//         // // block.translateX(1);
//         // // block.translateY(0.5);
//         // // block.rotateX(0.04);
//         // //group.add(block);

//         // 设置动画
//         let times = [0, downTimer]; //关键帧时间数组，离散的时间点序列
//         let values = [blockStartPosition, 0.06, 0, blockStartPosition, -0.5, 11]; //与时间点对应的值组成的数组
//         // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
//         let posTrack = new KeyframeTrack('downBox.position', times, values);

//         // duration决定了默认的播放时间，一般取所有帧动画的最大时间
//         // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
//         var clip = new AnimationClip("default", downTimer, [posTrack])

        

//         //scene.add(group);
//         scene.add(block);

//         const handleAnimationFinished = () => {
//             scene.remove(block);
//         }

//         // let tweenPosition = new TWEEN.Tween({x:blockStartPosition, y:0.06, z:0})
//         // .to({ x: blockStartPosition, y: -0.5, z: 11 }, downTimer)
//         // .easing(TWEEN.Easing.Linear.None)
//         // .onComplete(handleAnimationFinished)
//         // .start(0);

//         // group作为混合器的参数，可以播放group中所有子对象的帧动画
//         var mixer = new AnimationMixer(block);
//         //var mixer = new AnimationMixer(group);
//         // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
//         var AnimationAction = mixer.clipAction(clip);
//         //通过操作Action设置播放方式
//         AnimationAction.timeScale = downTimer; //默认1，可以调节播放速度
//         AnimationAction.loop = LoopOnce; //不循环播放
//         AnimationAction.play(); //开始播放
        
//         mixer.addEventListener('finished', handleAnimationFinished);

//         let clock = new Clock();
//         let timeS = 0;
//         // 渲染函数
//         let tick = 0;
//         function render() {

//             let T = clock.getDelta();
//             tick += T;
//             timeS = timeS + T;
//             console.log(tick);
            
//             if (timeS >= renderInterval) {
//                 renderer.render(scene, camera); //执行渲染操作
//                 mixer.update(T);
//                 //console.log("here");
//                 //TWEEN.update(T);
//                 timeS = 0;
//                 stats.update();
//             }
            
//             requestAnimationFrame(render);            
//         }
//         render();
//         // const render = () => {
//         //     renderer.render(scene, camera);
//         //     console.log("render 一次");
//         // }
//         // render();

        
//         // const animate = () => {
//         //     cube.rotation.x += 0.01
//         //     cube.rotation.y += 0.01
    
//         //     render()
//         //     frameId = window.requestAnimationFrame(animate)
//         // }

//         // const start = () => {
//         //     if (!frameId) {
//         //     frameId = requestAnimationFrame(animate)
//         //     }
//         // }
    
//         // const stop = () => {
//         //     cancelAnimationFrame(frameId as number)
//         //     frameId = null
//         // }
//     }
//     // useEffect(() => {
//     //     if (isAnimating && controls.current) {
//     //         (controls.current).start()
//     //     } else if (!isAnimating && controls.current){
//     //         controls.current.stop()
//     //     }
//     // }, [isAnimating])
    
//     return(
//         <>
//             <div className="vis" ref={mount}/>
//             <Video src={require('./test4.mp4').default}  autoPlay={false} loop={true}/>
//             <Counter counts={score}></Counter>
//             <button className="animateButton animateButtonLeft" onClick={() => {handleGenerate('l')}}>动画左</button>
//             <button className="animateButton animateButtonMid" onClick={() => {handleGenerate('m')}}>动画中</button>
//             <button className="animateButton animateButtonRight" onClick={() => {handleGenerate('r')}}>动画右</button>
//         </>
//     ) 
// }

type blockInfo = {
    startTick: number,
    type: string,
    status: string,
}


type sceneRef = {
    scene: Scene,
    renderer: Renderer,
    camera: Camera,
    group: Group,
    stats: Stats,
    mixer: AnimationMixer,
    mixerQueue: Map<AnimationMixer, boolean>,
    tickQueue: Array<blockInfo>,
}



const App = () => {
    const mount = useRef<HTMLDivElement>(null)
    const controls = useRef<sceneRef | null>(null);
    const [ score, setScore ] = useState(0);
    const currentTicks = useRef<number>(0);
    const currentTickID = useRef<number>(0);
    
    useEffect(() => {
        if (!mount.current) {
            throw Error("null ref");
        }
        else {
            var axes = new AxesHelper(20);
            let width = mount.current.clientWidth
            let height = mount.current.clientHeight
            let stats = Stats();
            const scene = new Scene()
            

            const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
            // const orbitControls = new OrbitControls(camera);
            // orbitControls.autoRotate = false;
            const renderer = new WebGLRenderer({ antialias: true, alpha:true })

            
            // 创建一个网格对象
            const geometry = new BoxGeometry(0.8, 0.1, 10) // 盒体的长宽高
            // 判定区域 z轴 8.2 9 
            const material = new MeshBasicMaterial({ color: 0xff00ff })
            //const cube = new Mesh(geometry, material)
            

            const rail1 = new Mesh(geometry, material);
            const rail2 = new Mesh(geometry, material);
            const rail3 = new Mesh(geometry, material);
            rail1.translateX(1);
            rail3.translateX(-1);
            rail1.rotateX(0.05); // 内部为弧度，弧度计算 (角度/180)*PAI = 弧度
            rail2.rotateX(0.05);
            rail3.rotateX(0.05);
            rail1.translateZ(6);
            rail2.translateZ(6);
            rail3.translateZ(6);


            //scene.add(cube)
            // scene.add(rail1);
            // scene.add(rail2);
            // scene.add(rail3);
            // 设置背景为透明色
            renderer.setClearColor('0xEEEEEE', 0.0)
            renderer.setSize(width, height)
            
            // const point = new PointLight(0xFFFFFF);
            // point.position.set(0, 2, 0);
            // scene.add(point);
            scene.add(axes);
            
            camera.position.x = 0;
            camera.position.y = 1;
            camera.position.z = 12.5;

            // camera.position.x = 3;
            // camera.position.y = 0.5;
            // camera.position.z = 1;
            // camera.rotateY(20);

            // camera.position.x = 0;
            // camera.position.y = 2;
            // camera.position.z = 0;
            // camera.rotateX(-1.5);

            // 创建 downBlock 的 group
            let group = new Group();
            group.add(rail1, rail2, rail3);
            

            
            
            // window.size 改变，重新渲染图形
            const handleResize = () => {
                if (!mount.current) {
                    throw Error("null mount ref");
                }
                width = mount.current.clientWidth
                height = mount.current.clientHeight
                renderer.setSize(width, height)
                camera.aspect = width / height
                camera.updateProjectionMatrix()
                render()
            }
                    
            mount.current.appendChild(renderer.domElement);
            mount.current.appendChild( stats.dom );
            window.addEventListener('resize', handleResize);
            //orbitControls.addEventListener('change', render);
            
            // stats.begin();

            const handleSpaceDown = (e:KeyboardEvent) => {
                //console.log(e.key);
                e.preventDefault();
                // if(e.key == ' ' && (currentTickID.current < tickQueue.length)) {
                //     // 20s 下落 下边在上 18.54 中间 19.26 上边在下 20.1
                //     // 上边界 9.341 9.674 下边界 11.01 12.34 0.3 1.3
                //     console.log(tickQueue[currentTickID.current].startTick);
                //     console.log(currentTicks.current);
                //     let judgeTick = tickQueue[currentTickID.current].startTick;
                //     let current = currentTicks.current;
                //     // 判定范围 400ms 判定中 1s-400ms 判定乱按不中
                //     let judgeBorder1 = current - 0.04*downTimer*3; 
                //     let judgeBorder2 = current - 0.04*downTimer;
                //     let judgeBorder3 = current + 0.05*downTimer;
                //     let judgeBorder4 = current + 0.05*downTimer*3;   
                //     if (judgeTick >= judgeBorder2 && judgeTick <= judgeBorder3) {
                //         setScore((preState)=>{return preState+1}); // 防止 state 丢失
                //         currentTickID.current++;
                //     }
                //     else if ((judgeTick >= judgeBorder1 && judgeTick < judgeBorder2) || (judgeTick > judgeBorder3 && judgeTick <= judgeBorder4)) {
                //         currentTickID.current++; // 距离太近时没中，所以id要自增，不会再去判断这个音符
                //     }
                // }
                if(e.key == ' ' && tickQueue.length && tickQueue[0].status == 'pending') {
                    // pending状态有两种情况，一种是perfect命中，则之后不会对该音符进行判断，直到它被卸载，另一种是miss，不会加分，也不会被判断，直到它被卸载
                    // 如果没有操作，最后pending状态的音符也会被正常卸载，卸载后即可判断下一个音符
                    // 20s 下落 下边在上 18.54 中间 19.26 上边在下 20.1
                    // console.log(tickQueue[0].startTick);
                    // console.log(currentTicks.current);

                    let judgeTick = tickQueue[0].startTick;
                    let current = currentTicks.current;
                    // 判定范围 400ms 判定中 1s-400ms 判定乱按不中
                    let judgeBorder1 = current - 0.04*downTimer*3; 
                    let judgeBorder2 = current - 0.04*downTimer;
                    let judgeBorder3 = current + 0.05*downTimer;
                    let judgeBorder4 = current + 0.05*downTimer*3;   
                    if (judgeTick >= judgeBorder2 && judgeTick <= judgeBorder3) {
                        setScore((preState)=>{return preState+1}); // 防止 state 丢失
                        tickQueue[0].status = 'perfect';
                        //console.log("命中");
                    }
                    else if ((judgeTick >= judgeBorder1 && judgeTick < judgeBorder2) || (judgeTick > judgeBorder3 && judgeTick <= judgeBorder4)) {
                        tickQueue[0].status = 'miss' // 距离太近时没中，所以id要自增，不会再去判断这个音符
                    }
                }
            }

            const setKeybordDown = () => {
                window.addEventListener('keypress', handleSpaceDown);
            }
            setKeybordDown();

            // group作为混合器的参数，可以播放group中所有子对象的帧动画
            scene.add(group);
            let mixer = new AnimationMixer(group);
            let mixerQueue = new Map<AnimationMixer, boolean>();
            let tickQueue:Array<blockInfo> = [];

            controls.current = { scene, renderer, camera, group, stats, mixer, mixerQueue, tickQueue}; // 获取scene的引用
            let clock = new Clock();
            let timeS = 0;

            let FPS = 100;
            let renderInterval = 1 / FPS;

            const render = () => {
                let T = clock.getDelta();
                currentTicks.current += T;
                //console.log(clock.elapsedTime);
                timeS = timeS + T;
                if (timeS >= renderInterval) {
                    mixer.update(T);
                    //console.log(mixer)
                    if (mixerQueue.size != 0) {
                        for (let i of Array.from(mixerQueue.keys())) {
                            i.update(T);
                            //console.log(i)
                        }
                    }
                    renderer.render(scene, camera); //执行渲染操作
                    //console.log("here");
                    //TWEEN.update(T);
                    timeS = 0;
                    stats.update();
                    //console.log(Array.from(mixerQueue.keys()));
                }
                
                requestAnimationFrame(render);    
            }
            
            render();

            return () => { // 清除副作用
                let realMount = mount.current as HTMLDivElement;
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('keypress', handleSpaceDown);
                //orbitControls.removeEventListener('change', render);

                realMount.removeChild(renderer.domElement);

                geometry.dispose();
                material.dispose();
                scene.remove(group);
                // stats.end();
            }
        }
    }, [])

    const handleGenerate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, direction: string) => {
        let {
            scene,
            renderer,
            camera,
            group,
            stats,
            mixer,
            mixerQueue,
            tickQueue,
        } = controls.current as sceneRef;


        let blockStartPosition = 0;

        switch(direction) {
            case 'l': blockStartPosition = -1; break;
            case 'm': blockStartPosition = 0; break;
            case 'r': blockStartPosition = 1; break;
            default: throw new Error("wrong direction");
        }
        

        const geometry = new BoxGeometry(0.8, 0.03, 0.4) // 盒体的长宽高
        const material = new MeshBasicMaterial({ color: 0xDC143C })
        let block = new Mesh(geometry, material);
        block.name = "downBox";
        // block.translateX(1);
        // block.translateY(0.5);
        // block.rotateX(0.04);
        // //group.add(block);

        // 设置动画
        let times = [0, downTimer]; //关键帧时间数组，离散的时间点序列
        let values = [blockStartPosition, 0.06, 0.15, blockStartPosition, -0.4, 11.2]; //与时间点对应的值组成的数组
        let posTrack = new KeyframeTrack('downBox.position', times, values);
        //var colorKF = new KeyframeTrack('downBox.material.color', times, [220, 20, 60, 220, 20, 60]);

        // duration决定了默认的播放时间，一般取所有帧动画的最大时间
        // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
        let clip = new AnimationClip("default", downTimer, [posTrack])


        scene.add(block);
        //scene.add(group);

        const handleAnimationFinished = (e:any) => { // 实在是没找到类型
            //console.log("finish");
            if (mixerQueue.has(e.target)){
                mixerQueue.delete(e.target);
            }
            //console.log("回收")
            //console.log(block);
            tickQueue.shift();
            block.geometry.dispose();
            block.material.dispose();
            scene.remove(block);
        }

        let dropMixer = new AnimationMixer(block);
        // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
        let AnimationAction = dropMixer.clipAction(clip);
        //通过操作Action设置播放方式
        AnimationAction.timeScale = 1; //默认1，可以调节播放速度
        AnimationAction.loop = LoopOnce; //不循环播放

        // json文件中存入的应该是正好到达判定中心的位置，也就是开始渲染的tick + (9.4)*dropTime/12
        tickQueue.push({startTick: currentTicks.current+((9.3)*downTimer/10), type:'singleBlock', status:"pending"})
        // 上边界 9.341 9.674 下边界 11.01 12.34

        AnimationAction.play(); //开始播放
        mixerQueue.set(dropMixer, true);

        dropMixer.addEventListener('finished', handleAnimationFinished);
        
        //console.log("listen")
        setTimeout(() => {
            dropMixer.removeEventListener('finished', handleAnimationFinished);
        }, downTimer*2*1000);

        // 解决空格键重复触发按钮点击事件，实际项目中不需要处理
        let btn = e.target as HTMLButtonElement;
        btn.blur();

        // const render = () => {
        //     renderer.render(scene, camera);
        //     console.log("render 一次");
        // }
        // render();

        
        // const animate = () => {
        //     cube.rotation.x += 0.01
        //     cube.rotation.y += 0.01
    
        //     render()
        //     frameId = window.requestAnimationFrame(animate)
        // }

        // const start = () => {
        //     if (!frameId) {
        //     frameId = requestAnimationFrame(animate)
        //     }
        // }
    
        // const stop = () => {
        //     cancelAnimationFrame(frameId as number)
        //     frameId = null
        // }
    }

    const handleJSONReader = () => {
        //rhythm.reduce();
    }

    
    return(
        <>
            <div className="vis" ref={mount}/>
            <Video src={require('./test4.mp4').default}  autoPlay={false} loop={true}/>
            <Counter counts={score}></Counter>
            <button className="animateButton animateButtonLeft" onClick={(e) => {handleGenerate(e, 'l')}}>动画左</button>
            <button className="animateButton animateButtonMid" onClick={(e) => {handleGenerate(e, 'm')}}>动画中</button>
            <button className="animateButton animateButtonRight" onClick={(e) => {handleGenerate(e, 'r')}}>动画右</button>
            <button className="readJson" onClick={handleJSONReader}>生成谱面</button>
        </>
    ) 
}



export default App;
