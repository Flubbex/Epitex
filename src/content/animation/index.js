import girl from "./girl"

const lyrics = ["        See, it started in my section",
                "  said you need a little headroom",
                " Now you're my obsession" ,
                "   come with me up to my bedroom",
                "     If you really think you're up to my par, baby",
                "<span class='display-2 animate__animated animate__heartBeat animate__slow d-block' style='color:red;transform:rotate(30deg);font-family:Rage;'>HANDLE ME</span>"]

const eventConstructor = (API) => {
    const delay = API.util.delay
    return {
        animation:async ()=>{
            API.clear()
            const lines = girl.split("\n")
            API.playMusic("https://www.youtube.com/embed/jkPYTohcLNU?si=vZTd6Rwz1ZPk5gLL&amp;start=163")
            await delay(800)

            for (var y=0;y<lyrics.length;y++){
                API.print(`<span class='animate__animated animate__pulse animate__slow h4 d-block' style='margin-left:25%;'>${lyrics[y]}</span>`)
                await delay(y%2===0 ? 1500 : 2200)
                if (y===lyrics.length-2)
                    await delay(1900)
            }

            await delay(800)

            for (var x=0;x<18;x++){
                const anim = x%2==0 ? "lightSpeedInRight" : "lightSpeedInLeft"
                const r = Math.random()*100+100,
                        g = Math.random()*100+100,
                        b = Math.random()*100+100
                        
                const randomColor = `rgba(${r},${g},${b})`
                API.print(`<span class='animate__animated animate__${anim} animate__fast d-block display-4' style='margin-left:15%;font-family:Rage;color:${randomColor}'>I WANT YOUR HANDS ON ME</span>`)
                await delay(100)
            }
            for (var i=0;i<5;i++){

                for (const c in lines){
                    const line = lines[c]
                    const r = Math.random()*100+100,
                        g = Math.random()*100+100,
                        b = Math.random()*100+100
                        
                    const randomColor = `rgba(${r},${g},${b})`
                    API.print(`<span class="bold animate__animated animate__shakeX animate__slow d-block h5" style="color:${randomColor};">${line}</span>`)
                    if (c < lines.length-1)
                        await delay(30)
                }
            }
        }
    }
}

export default (API) => {
    return {
        room:[
            {
                id:"AnimationTest",
                name:"Animation Test",
                type:"room",
                description:"Animation test",
                event:{
                    "playerEntered":["animation"]
                }
            }
        ],
        event:eventConstructor(API),
        info:{
            name:"Animation Test",
            description:"Animation test",
            startRoom:"AnimationTest",
        }
    }
}