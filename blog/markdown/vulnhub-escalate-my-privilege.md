<div class="header">
  <div class="nav"><a href="https://eban.dev/blog/">ACCUEIL</a><a href="https://eban.dev/blog/contact.html">CONTACT</a><a href="https://eban.dev/blog/about.html">A PROPOS</a></div>
  <h1>Eban's Blog</h1>
</div>
<div class="article-list">


# Vulnhub : Escalate my Privilege 📝

Pour ce premier write-up, on commence par une machine (très) simple, Escalate My Privilege qui est une box créée par Akanksha Sachin Verma. [Ici](https://www.vulnhub.com/entry/escalate-my-privileges-1,448/), le lien pour le télécharger

## ENUMERATION

Pour trouver l’IP de notre box, on lance la commande suivante sur notre kali

> netdiscover

Cette commande liste tous les appareils connectés à notre réseau local.

![](https://i.postimg.cc/rFpwfjTk/Capture-d-u2019-cran-de-2020-04-19-15-48-33-604x198.png)

On voit ici que nous avons notre box en 192.168.1.23\. On lance donc un scan nmap sur l’IP de notre box, pour cela on lance la commande

> nmap -A 192.168.1.23

![](https://i.postimg.cc/WbN9DFvz/Capture-d-u2019-cran-de-2020-04-19-15-56-46.png)

Nous avons donc, du SSH à jour et sans faille connue, un serveur http sur le port 80, un serveur rpc ansi que du nfs_acl sur le port 2049\. Pour commencer, regardons du côté du serveur web, on trouve d’abord une page avec une image renvoyant vers le site du créateur de la box, en regardant le code source de cette page, on voit

> alt=”[http://ip/phpbash.php](http://ip/phpbash.php)”

![](https://i.postimg.cc/Pr5BgFNS/Capture-d-u2019-cran-de-2020-04-19-16-05-33.png)

## EXPLOITATION & ELEVATION DE PRIVILEGE

On essaye donc d’accéder à l’URL

> [http://192.168.1.23/phpbash.php](http://192.168.1.23/phpbash.php)

La page se trouve etre un shell, on s’empresse donc d’envoyer un reverse shell en PHP trouvé sur l’excellent site PentestMonkey

![](https://i.postimg.cc/gjZ6jK2Q/Capture-d-u2019-cran-de-2020-04-19-16-23-21.png)

Après avoir spawné un shell tty avec la commande

> python -c ‘import pty; pty.spawn(“/bin/sh”)

On remarque qu’il y a un fichier nommé readme.txt dans /var/www/html qui indique

`HI`  
`Find Armour User backup in /backup`

Nous allons donc voir le contenu de /backup/armour, ce dossier contient plusieurs archives dont une qui a un nom différent des autres, 1.tar.gz

![](https://i.postimg.cc/VkVb861d/Capture-d-u2019-cran-de-2020-04-19-16-34-18.png)

On la décompresse donc avec la commande dans le répertoire /home/armour qui nous est accessible en écriture.

> tar -xf 1.tar.gz

On trouve donc un fichier Credentials.txt qui contient

`my password is md5(rootroot1)`

On essaye donc de se connecter au compte de l’utilisateur armour avec la commande

> su armour

On utilise donc le hash md5 de rootroot1, ce qui donne

`b7bc8489abe360486b4b19dbc242e885`

On obtient donc un shell en tant que armour, après avoir spawné un shell tty. En lancant la commande sudo -l, on remarque que l’on peut éxecuter /bin/sh en tant que root sans mot de passe !

![](https://i.postimg.cc/NFjgF6kY/Capture-d-u2019-cran-de-2020-04-19-16-55-51.png)

Il ne nous reste plus qu’à faire

> sudo bash  
> cat root/proof.txt

Et voilà ! Nous avons le flag, cette box fut facile, je la recommanderais pour une première box…

</div>
