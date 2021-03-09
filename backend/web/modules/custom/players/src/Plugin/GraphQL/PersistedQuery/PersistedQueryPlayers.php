<?php

namespace Drupal\players\Plugin\GraphQL\PersistedQuery;

use Drupal\graphql\PersistedQuery\PersistedQueryPluginBase;
use GraphQL\Server\OperationParams;

/**
 * @PersistedQuery(
 *   id = "persisted_query_players",
 *   label = "Persisted Query Players",
 *   description = "Persisted query plugin for players query"
 * )
 *
 * Class PersistedQueryPlayers
 * @package Drupal\players\Plugin\GraphQL\PersistedQuery
 */
class PersistedQueryPlayers extends PersistedQueryPluginBase {

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
      'query_players' => '{ players { items { firstName lastName } } }',
    ];
  }

}
