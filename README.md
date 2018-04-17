# Shopping Liste
Die Shopping Liste Implementation ist abgeleitet von [diffsync-template](https://github.com/mmueller-tgm/diffsync-template), meiner Lösung zu [KevinW1998](https://github.com/KevinW1998)'s  [diffsync-template
](https://github.com/KevinW1998/diffsync-template).

## Client
Unter __client/src__ ist die Source zu finden. Diese muss mithilfe von webpack noch für den Webbrowser konvertiert werden. Dies passiert wenn man im client Ordner `npm start` eingibt. Weiters muss ein HTTP Server gestartet werden mit `npm run server`.

Wenn der Client sich mit einem anderen Server verbinden soll als _,,localhost:3001''_ kann dieser in Zeile 8 von __client/src/index.js__ verändert werden. Nach einer Veränderung muss wieder `npm start` ausgeführt werden.

## Server
Damit die Shoppingliste mit anderen Clients synchronisiert wird, muss der diffsync Server noch gestartet werden. im server Ordner wird dazu `npm start` ausgeführt.

Wenn der Port von dem diffsync Server verändert werden soll kann das in Zeile 25 (oder 21 wenn HTTPS verwendet wird) von __server/index.js__ angepasst werden.

## Beispiel
Ein Beispiel ist auf meiner Website gehostet unter __https://mmueller.xyz/syt__.
