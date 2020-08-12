---
title: Vos mots de passe sont ils vraiment sécurisés 🔐
keywords: [password, secure, mot de passe, securité, securisé, mdp, eban]
description: Aujourd'hui, nous utilisons des mots de passe partout, pour déverrouiller son téléphone, son ordinateur, son compte en banque et bien d'autres. Il parait donc indispensable d'avoir des mots de passe forts pour sécuriser ces comptes. Dans cet article nous allons donc nous pencher sur comment sécuriser ces précieux sésames.
url: https://blog.eban.dev/tutos/vos-mots-de-passe-sont-ils-vraiment-securises
image: https://images.unsplash.com/photo-1592439024283-43a91c26a445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
...

# Vos mots de passe sont ils vraiment sécurisés 🔐

Aujourd'hui, nous utilisons des mots de passe partout, pour déverrouiller son téléphone, son ordinateur, son compte en banque et bien d'autres. Il parait donc indispensable d'avoir des mots de passe **forts** pour sécuriser ces comptes. Dans cet article nous allons donc nous pencher sur comment sécuriser ces précieux sésames.

### 1) Avoir des mots de passe différents

Il est très important d'avoir des mots de passe différents sur chaque compte, imaginez un de vos comptes est piraté et votre mot de passe est récupéré, il suffirait donc au pirate de réutiliser ce même mot de passe sur tous vos comptes pour y avoir accès… Etant donné qu'il est impossible de retenir des dizaines de mots de passe différents, les gestionnaires de mots de passe on été inventés, ils permettent de n'avoir qu'à retenir qu'un mot de passe, celui de votre gestionnaire ! Il existe de nombreux service de gestionnaires de mots de passe, je vous conseille :

  - [https://apps.nextcloud.com/apps/passwords](Nexcloud Passwords) (Si vous avez un cloud Nextcloud, Nexcloud Passwords est le meilleur gestionnaire de mots de passe)
  - [https://bitwarden.com/](Bitwarden) (Très bon gestionnaire de mot de passe entièrement open source)

Il ne vous reste plus qu'à installer un des ces services sur tout vos appareils

### 2) Utiliser des mots de passe vraiment complexes

Le meilleur moyen d'avoir des mots de passe sécurisés est d'utiliser des charactères spéciaux, traditionnellement on recommande d'utiliser des caractères comme @, $ ou \*.
Il existe cependant un facon plus facile mais méconnue d'avoir un mot de passe complexe facilement, **les emojis**.
Beaucoup de services acceptent les emojis comme mot de passe ! En voici une liste :

  - Twitter ✅
  - Github ✅
  - Amazon ✅
  - Discord ✅
  - Protonmail ✅
  - Spotify ✅

On peut aussi, pour sécuriser nos mot de passe utiliser des caractères d'autres alphabets que l'alphabet latin, du cyrillique, des lettres de l'alphabet arabe ou memes des charactères en Japonais, Coréen, en bref tout les charactères de la table Unicode

Pour simplifier cette démarche de création de mot de passe, j'ai fait un petit script Python sur mon Github disponible [ici](https://github.com/ebanDev/unicode-password-generator)

Il est enfin, très important d'activer l'A2F sur tout vos comptes, je recommande l'app Aegis pour mettre en place cette authentification à deux facteurs

Il existe aussi des Clés USB A2F ! Plus sécurisés qu'une app sur mobile... En voici une liste : [https://shutuptrackers.com/hardware/authentification.php](https://shutuptrackers.com/hardware/authentification.php)

#### Remerciements

Merci a Erispar pour la relecture

Merci a 0x66 de m'avoir donné l'idée de parler des Clés USB A2F
