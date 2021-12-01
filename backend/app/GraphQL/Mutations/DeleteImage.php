<?php

namespace App\GraphQL\Mutations;
use App\Models\Image;

class DeleteImage
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $image = Image::find($args);

        $s3 = \Storage::disk('s3');

        $adapter = $s3->getDriver()->getAdapter();
        $client = $adapter->getClient();
        $bucket = $adapter->getBucket();
    try {

    $result = $client->deleteObject([
        'Bucket' => $bucket,
        'Key' => $image[0]->id,
    ]);
    } catch (S3Exception $e) {
        echo $e->getMessage(); 
    }

    if ($client->doesObjectExist($bucket, $image[0]->id)) {
        return ['success' => false, 'message' => 'Erro ao deletar arquivo'];
    } else {
        $image[0]->delete();
        if (sizeof(Image::find($args)) === 0) {
            return ['success' => true, 'message' => 'Arquivo e registro deletado com sucesso'];
        } else {
            return ['success' => false, 'message' => 'Arquivo deletado com sucesso, porém falha ao deletar registro'];
        }
    }
}
}
