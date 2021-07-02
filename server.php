<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);//берет данные, которые пришли с клиента, превращает их с строку, и показывает на клиенте