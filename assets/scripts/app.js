const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STORNG_ATTACK_VALUE = 19
const HEAL_VALUE = 20
const SIMPLE_ATTACK = 'SIMPLE_ATTACK'
const STORNG_ATTACK = 'STORNG_ATTACK'
const PERSON_SIMPLE_ATTACK = 'PERSON_SIMPLE_ATTACK'
const MONSTER_SIMPLE_ATTACK = 'MONSTER_SIMPLE_ATTACK'
const MONSTER_STRONG_ATTACK = 'MONSTER_STRONG_ATTACK'
const PERSON_STRONG_ATTACK = 'PERSON_STRONG_ATTACK'
const HEAL_EVENT ='HEAL_EVENT'
const GAME_OVER = 'GAME_OVER'

let logs = []
let choosenMaxLife = 100
let monsterPower = choosenMaxLife
let personPower = choosenMaxLife
let count = 2
let son = true
let isLogged;


adjustHealthBars(choosenMaxLife)
function disableButton() {
       attackBtn.removeEventListener('click',simpleAttackAction)
       strongAttackBtn.removeEventListener('click',strongAttackAction)
}

function reset() {
     monsterPower = choosenMaxLife
    personPower = choosenMaxLife
    resetGame(choosenMaxLife)
    count = 2
    son = true
}



function writeLog(event,value,monHealth,playerHealth) {
    let log;
    switch (event) {
        case PERSON_SIMPLE_ATTACK:
            log = {
                event,
                value,
                target:'Monster',
                monsterHealth: monHealth,
                playerHealth
            }
            break;
        case MONSTER_SIMPLE_ATTACK:
            log = {
                event,
                value,
                target: 'PERSON',
                monsterHealth: monHealth,
                playerHealth
            }
            break;
        case PERSON_STRONG_ATTACK:
              log = {
                event,
                value,
                target: 'MONSRTER',
                monsterHealth: monHealth,
                playerHealth
            }
            break;
        case HEAL_EVENT:
              log = {
                event,
                value,
                target: 'PERSON',
                monsterHealth: monHealth,
                playerHealth
            }
            break;
        case GAME_OVER:
              log = {
                event,
                value,
                monsterHealth: monHealth,
                playerHealth
            }
            break;

    
        default:
            log = {}
            break;
    }
    logs.push(log)
}

function gameOver() {
      if (monsterPower <= 0 && personPower > 0 ) {
        alert('Siz yutdingiz ☺')
       writeLog(GAME_OVER,'siz yutdiz',monsterPower,personPower)
    } else if (personPower <= 0 && monsterPower > 0) {
        alert('Siz yutqazdingiz ☹')
         writeLog(GAME_OVER,'siz yutkizdiz',monsterPower,personPower)
    } else if (personPower <= 0 && monsterPower <= 0) {
          alert('Gap yo kuchila teng ekan 🤝')
           writeLog(GAME_OVER,'Durang',monsterPower,personPower)
        
    }
}


function attackAction(type) {
    let power;
    let eventAttack;
    if (type === STORNG_ATTACK) {
        power = STORNG_ATTACK_VALUE
        eventAttack = PERSON_STRONG_ATTACK 
    } else if(type === SIMPLE_ATTACK) {
        power = ATTACK_VALUE
        eventAttack = PERSON_SIMPLE_ATTACK
    }
      let damage = dealMonsterDamage(power)
    monsterPower -= damage
     writeLog(eventAttack,damage,monsterPower,personPower)
    let personDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
    personPower -= personDamage
    writeLog(MONSTER_SIMPLE_ATTACK,personDamage,monsterPower,personPower)
        
    gameOver()

    if (monsterPower <= 0 || personPower <= 0) {
        reset()
    }
 }

function simpleAttackAction() {
  attackAction('SIMPLE_ATTACK')
   
}
function strongAttackAction() {
    if (count > 0) {
        attackAction('STORNG_ATTACK')
        count--
    } else {
        alert('Imkonyatiz qolmadi')
    }
}

function healActions() {
    if (son) {
        let healvalue;
    if (personPower >= choosenMaxLife - HEAL_VALUE) {
        alert('Maksimal kuch berildi sizga')
        healvalue = choosenMaxLife - personPower
        son = true
    } else {
        healvalue = HEAL_VALUE
        son = false
    }
    increasePlayerHealth(healvalue)
        personPower += healvalue
        writeLog(HEAL_EVENT,healvalue,monsterPower,personPower)
    } else {
        
        alert('Imkonyatiz qolmadi')
    }
}





function printLog() {
    let j = 0 
    for (let i of logs) {
        console.log(j + '##########')
        if (!isLogged  || isLogged < i) {
            for (let key in i) {
            console.log(`${key}=>${i[key]}`)
            }
            isLogged = i
        }
        
        j++
        break   
    }
 
}

   


attackBtn.addEventListener('click',simpleAttackAction)
strongAttackBtn.addEventListener('click',strongAttackAction)
healBtn.addEventListener('click', healActions)
logBtn.addEventListener('click', printLog)

