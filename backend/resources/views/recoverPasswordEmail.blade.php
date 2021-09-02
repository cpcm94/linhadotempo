<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
</head>
<body>
<h3>Recuperação de senha</h3>

<div>
<p> Olá {{ $data['user_name'] }}, </p>
    <p>
    Recebemos uma solicitação para redefinir a sua senha. Para continuar clique no link abaixo:
    </p>
    <br />
    <br />
    <br />
    <a href="https://www.stage.alinhadotempo.com.br/recoverPassword/{{ $data['hash_id'] }}"> Clique aqui para redefinir sua senha </a>
    <br />
    <br />
    <br />
    <b>Se você não requisitou essa alteração, ignore esse email.</b>
</div>

</body>
</html>