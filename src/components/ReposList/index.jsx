import { useEffect, useState } from 'react';
import styles from './Reposlist.module.css';
const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [Carregando, setCarregando] = useState(true);
    const [Erro, setErro] = useState(false);

    useEffect(() => {
        setCarregando(true);

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error(`Erro na solicitação: ${resposta.status} - ${resposta.statusText}`);
                }
                return resposta.json();
            })
            .then(respostaJson => {
                setTimeout(() => {
                    setCarregando(false);   
                    setRepos(respostaJson);
                    setErro(false);
                }, 3000);
            })
            .catch(error => {
                console.error('Erro:', error);
                setCarregando(false);
                setErro(true);
            });
    }, [nomeUsuario]);

    return (
        <div className='container'>
            {Carregando ? (
                <h1>Carregando...</h1>
            ) : (
                Erro ? (
                    <h1>Erro ao carregar os dados</h1>
                ) : (
                    <ul className={styles.list}>
                        {repos.map(({ id, name, language, html_url }) => (
                            <li className={styles.listItem} key={id}>
                                <div className={styles.ItemName}>
                                    <b>Nome:</b>
                                    {name}
                                </div>
                                <div className={styles.ItemLanguage}>
                                    <b>Linguagem:</b>
                                    {language}
                                </div>
                                <a className={styles.Itemlink} target='_blank' href={html_url}>Visitar no github</a>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    )
}
export default ReposList;