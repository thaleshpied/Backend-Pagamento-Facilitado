<?php namespace App\Services;

class SessionService
{
    protected $session;

    public function __construct()
    {
        $this->session = session();
    }

    public function getSessionData()
    {
        $userID = $this->session->get('IDCLIENTE');

        if (empty($userID)) {
            return null;
        }

        return [
            'userID'    => $userID,
            'CODCCUSTO' => $this->session->get('CODCCUSTO'),
            'USUARIO'   => $this->session->get('USUARIO'),
            'CLIENTE'   => $this->session->get('CLIENTE'),
            'NOME_CENTRO_CUSTO' => $this->session->get('NOME_CENTRO_CUSTO'),
            'APROVA_RDO_NV1' => $this->session->get('APROVA_RDO_NV1'),
            'APROVA_RDO_NV2' => $this->session->get('APROVA_RDO_NV2'),
            'RECURSO_HUMANOS' => $this->session->get('RECURSO_HUMANOS'),
            'SUPERINTENDENTE' => $this->session->get('SUPERINTENDENTE'),
            'NOME_USUARIO' => $this->session->get('NOME_USUARIO'),
            'SUPRIMENTOS' => $this->session->get('SUPRIMENTOS')
        ];
    }

    public function requireAuth()
    {
        $data = $this->getSessionData();
        if ($data === null) {
            $url = current_url();
            $this->session->set('redirect_url', $url);
            return redirect()->to(site_url('page-login'));
        }

        return $data;
    }

    public function set($key, $value)
    {
        $this->session->set($key, $value);
    }

    public function get($key)
    {
        return $this->session->get($key);
    }
}