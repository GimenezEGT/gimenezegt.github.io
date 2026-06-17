---
layout: post
title:  "Como criar um teclado personalizado com um Pipico (tutorial de Raspberry Pi)"
date:   2026-06-10 23:03:45 -0300
categories: [tutorials, electronics, raspberry-pi, automation]
excerpt: "Aprenda passo a passo como configurar um Raspberry Pi Pico com CircuitPython para criar botões externos que funcionam como um teclado virtual no seu PC."
image: /assets/images/blog/pipico.png
toc: true
featured: true
---

> Project link: [Wokwi](https://wokwi.com/projects/467031928539717633)

### PT

# Primeiros passos na eletrônica

Estou começando a aprender sobre eletrônica e microcontroladores, e escolhi um pequeno projeto para entender como funcionam os botões externos nos microcontroladores.
Estou usando um Raspberry Pi Pico sem Wi-Fi que estou carinhosamente chamando de Pipico.

No que consiste o projeto:
- Dois botões:

* Um abre o CMD do computador.
 O outro digita um comando.

Usei o gemini para me ajudar com as ideias de projetos e me corrigir erros.

Como esse projeto tem uma interface com o meu PC e vai rodar comando diretamente nele, precisei colocar outro firmware nele, o CircuitPython.
Assim que recebi meu kit com o Pipico, havia instruções no manual para instalar o MicroPython e foi o que eu fiz. Mas o gemini me recomendou que eu instalasse o CircuitPython pois ele já possui bibliotecas que permitem usar o Pipico como entrada para o meu computador como um teclado virtual.

A ligação ficou assim:
* Botão 1: GPIO15
* Botão 2: GPIO14

Botão 1 escreve "echo Hello, world!" em qualquer programa aberto com uma caixa de texto com um cursor ativo.
Botão 2 "tecla" o botão do Windows, digita "cmd" e aperta "Enter", abrindo o terminal.

# Como instalar o CircuitPython:
1. Baixe em [[https://circuitpython.org/board/raspberry_pi_pico/]]
2. Com o Pipico desconectado do seu PC, pressione o botão de BOOTSEL (Boot Select) e o mantenha pressionado
3. Conecte o USB do Pipico no PC com o botão pressionado
4. Arraste o arquivo .uf2 baixado para dentro da pasta do Raspberry

# Como instalar as bibliotecas necessárias

1. Baixe a Library Bundle referente à versão do CircuitPython que você baixou em [[https://circuitpython.org/libraries]]. Eu usei a versão 10.2.1.
2. Procure pela pasta adafruit_hid dentro da pasta da Library Bundle que você baixou
3. Jogue essa pasta dentro da pasta lib no seu Pipico.

# Implementação
O código ficou muito simples:

~~~
import time
import board
import digitalio
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
from adafruit_hid.keycode import Keycode

#configuração de botão
btn = digitalio.DigitalInOut(board.GP15)
btn.direction = digitalio.Direction.INPUT
btn.pull = digitalio.Pull.UP

btn2 = digitalio.DigitalInOut(board.GP14)
btn2.direction = digitalio.Direction.INPUT
btn2.pull = digitalio.Pull.UP

#inicializa o controle do teclado
kbd = Keyboard(usb_hid.devices)
layout = KeyboardLayoutUS(kbd)

#grava estado inicial do botao para nossa detecção de borda
estado_anterior = btn.value
estado_anterior2 = btn2.value

print("Macro iniciado")

while True:
    estado_atual = btn.value
    estado_atual2 = btn2.value
    
    if estado_atual2 == False and estado_anterior2 == True:
        kbd.send(Keycode.GUI, Keycode.R)
        time.sleep(0.5)
        
        layout.write("cmd\n")
        time.sleep(0.1)
        
    estado_anterior2 = estado_atual2
    
    if estado_atual == False and estado_anterior == True:
        layout.write("echo Hello, world!\n")
        time.sleep(0.1)
        
    estado_anterior = estado_atual
    
    time.sleep(0.01)
~~~

O que faz cada coisa:

* import time -> biblioteca time padrão do Python
* import board -> mapeia os pinos da sua placa. Serve para fazer o setup.
* import digitalio -> é o equivalente à biblioteca machine do MicroPython. Serve para fazer o setup e para controlar a eletricidade na placa.
* import usb_hid -> Gerencia a porta USB em baixo nível. HID significa Human Interface Device. É por aqui que você consegue controlar seu PC.
* from adafruit_hid.keyboard import Keyboard -> Cria o teclado virtual.
* from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS -> Traduz o texto em comandos de tecla.
* from adafruit_hid.keycode import Keycode -> Dicionário de teclas especiais.


~~~
#configuração de botao
btn = digitalio.DigitalInOut(board.GP15)
btn.direction = digitalio.Direction.INPUT
btn.pull = digitalio.Pull.UP

btn2 = digitalio.DigitalInOut(board.GP14)
btn2.direction = digitalio.Direction.INPUT
btn2.pull = digitalio.Pull.UP
~~~

Cada botão tem seu pino, e ambos estão configurados com um resistor de Pull Up. Isso serve para que o botão não fique flutuando seus valores entre 0 e 1.
 O Pipico tem resistores internos que podem ser acionados via código. Esses resistores servem para normalizar a tensão que chega através dos botões.
Aqui podem ocorrer duas coisas:
1. Quando o botão é solto ou pressionado as partes metálicas se tocam e se separar muito rapidamente criando um efeito de _bouncing_ que deve ser ignorado.
2. Campos eletromagnéticos ao redor do botão e do circuito todo afetam as leituras que o Pipico faz dos botões, fazendo o botão funcionar como um antena. Os resistores de pull up e pull down normalizam essa flutuação. 0 é 0 e 1 é 1.

Quando configuramos o botão com um Pull Up, normalizamos o valor do botão quando solto para 1. Ou seja, botão solto tem valor 1 no código, e botão pressionado tem valor 0 no código. É o oposto do que pensaríamos normalmente, e é eletricamente invertido mesmo.

É só rodar tudo isso no Thonny e pronto. Seu primeiro projeto está pronto e já é bem legal.

Acabou.

---

### EN

# First steps in electronics

I'm starting to learn about electronics and microcontrollers, and I chose a small project to understand how external buttons work on microcontrollers.
I'm using a Raspberry Pi Pico without Wi-Fi that I'm affectionately calling Pipico.

What the project consists of:

* Two buttons:

* One opens the computer's CMD.
The other types a command.

I used Gemini to help me with project ideas and to correct my mistakes.

Since this project interfaces with my PC and will run commands directly on it, I needed to install another firmware on it, CircuitPython.
As soon as I received my kit with the Pipico, there were instructions in the manual to install MicroPython, which is what I did. But Gemini recommended that I install CircuitPython because it already has libraries that allow using the Pipico as an input for my computer like a virtual keyboard.

The wiring looks like this:

* Button 1: GPIO15
* Button 2: GPIO14

Button 1 writes "echo Hello, world!" in any open program with a text box and an active cursor.
Button 2 "presses" the Windows key, types "cmd", and presses "Enter", opening the terminal.

# How to install CircuitPython:

1. Download it at [[[https://circuitpython.org/board/raspberry_pi_pico/](https://circuitpython.org/board/raspberry_pi_pico/)]]
2. With the Pipico disconnected from your PC, press and hold the BOOTSEL (Boot Select) button.
3. Connect the Pipico's USB to the PC while holding the button down.
4. Drag the downloaded .uf2 file into the Raspberry folder.

# How to install the necessary libraries

1. Download the Library Bundle corresponding to the CircuitPython version you downloaded at [[[https://circuitpython.org/libraries](https://circuitpython.org/libraries)]]. I used version 10.2.1.
2. Look for the adafruit_hid folder inside the Library Bundle folder you downloaded.
3. Drop this folder inside the lib folder on your Pipico.

# Implementation

The code turned out to be very simple:

```
import time
import board
import digitalio
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
from adafruit_hid.keycode import Keycode

# button configuration
btn = digitalio.DigitalInOut(board.GP15)
btn.direction = digitalio.Direction.INPUT
btn.pull = digitalio.Pull.UP

btn2 = digitalio.DigitalInOut(board.GP14)
btn2.direction = digitalio.Direction.INPUT
btn2.pull = digitalio.Pull.UP

# initializes keyboard control
kbd = Keyboard(usb_hid.devices)
layout = KeyboardLayoutUS(kbd)

# saves initial button state for our edge detection
estado_anterior = btn.value
estado_anterior2 = btn2.value

print("Macro started")

while True:
    estado_atual = btn.value
    estado_atual2 = btn2.value
    
    if estado_atual2 == False and estado_anterior2 == True:
        kbd.send(Keycode.GUI, Keycode.R)
        time.sleep(0.5)
        
        layout.write("cmd\n")
        time.sleep(0.1)
        
    estado_anterior2 = estado_atual2
    
    if estado_atual == False and estado_anterior == True:
        layout.write("echo Hello, world!\n")
        time.sleep(0.1)
        
    estado_anterior = estado_atual
    
    time.sleep(0.01)

```

What everything does:

* import time -> standard Python time library
* import board -> maps the pins on your board. Used for setup.
* import digitalio -> is the equivalent of the machine library in MicroPython. Used for setup and controlling the electricity on the board.
* import usb_hid -> Manages the USB port at a low level. HID stands for Human Interface Device. This is how you are able to control your PC.
* from adafruit_hid.keyboard import Keyboard -> Creates the virtual keyboard.
* from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS -> Translates text into keystroke commands.
* from adafruit_hid.keycode import Keycode -> Dictionary of special keys.

```
# button configuration
btn = digitalio.DigitalInOut(board.GP15)
btn.direction = digitalio.Direction.INPUT
btn.pull = digitalio.Pull.UP

btn2 = digitalio.DigitalInOut(board.GP14)
btn2.direction = digitalio.Direction.INPUT
btn2.pull = digitalio.Pull.UP

```

Each button has its pin, and both are configured with a Pull Up resistor. This ensures that the button's values don't float between 0 and 1.
Pipico has internal resistors that can be activated via code. These resistors serve to normalize the voltage coming through the buttons.
Two things can happen here:

1. When the button is released or pressed, the metal parts touch and separate very quickly, creating a *bouncing* effect that must be ignored.
2. Electromagnetic fields around the button and the entire circuit affect the readings the Pipico takes from the buttons, making the button act like an antenna. Pull up and pull down resistors normalize this fluctuation. 0 is 0 and 1 is 1.

When we configure the button with a Pull Up, we normalize the button's value when released to 1. In other words, a released button has a value of 1 in the code, and a pressed button has a value of 0 in the code. It is the opposite of what we would normally think, and it is indeed electrically inverted.

Just run all this in Thonny and you're set. Your first project is ready and it's already pretty cool.

The end.