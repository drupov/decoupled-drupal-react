<?php

namespace Drupal\players\Plugin\GraphQL\PersistedQuery;

use Drupal\graphql\PersistedQuery\PersistedQueryPluginBase;
use GraphQL\Server\OperationParams;

/**
 * @PersistedQuery(
 *   id = "persisted_query_player",
 *   label = "Persisted Query Player",
 *   description = "Persisted query plugin for player query"
 * )
 *
 * Class PersistedQueryPlayer
 * @package Drupal\players\Plugin\GraphQL\PersistedQuery
 */
class PersistedQueryPlayer extends PersistedQueryPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getQuery($id, OperationParams $operation) {
    $queryMap = $this->queryMap();
    return $queryMap[$id] ?? NULL;
  }

  /**
   * Map between persisted query IDs and corresponding GraphQL queries.
   */
  protected function queryMap() {
    return [
      '8a2e105247121daa50c04672d60890dab1137106377e8901b907f6be671275e2' => 'query Player ($id: Int!) { player(id: $id) { firstName lastName } }',
    ];
  }

}
